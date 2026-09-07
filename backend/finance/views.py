from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q

from django.conf import settings
from .permissions import IsCRC, IsCRCUserOrReadOnly, IsQueryOwnerOrCRC
from .models import CRC, Ledger, Subcategory, Transaction, Vendor, Paylet, Announcement, Query, PayletTemplate
from .serializers import (
    CRCSerializer, LedgerSerializer, SubcategorySerializer, 
    TransactionSerializer, VendorSerializer, PayletSerializer, 
    AnnouncementSerializer, QuerySerializer
)
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.http import JsonResponse
from django.middleware.csrf import get_token

from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum

from titlecase import titlecase
from docxtpl import DocxTemplate

from django.utils import timezone
from django.http import HttpResponse
import os
import tempfile

# Create your views here.

#sending cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set', 'csrfToken': get_token(request)})

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:5173"
    
class CRCViewSet(viewsets.ModelViewSet):
    queryset = CRC.objects.all()
    serializer_class = CRCSerializer
    permission_classes= [IsCRCUserOrReadOnly]

class LedgerViewSet(viewsets.ModelViewSet):
    queryset = Ledger.objects.all().order_by('-created_at')
    serializer_class = LedgerSerializer
    permission_classes= [IsCRCUserOrReadOnly]
    
    
    def get_queryset(self):
        user=self.request.user
        
        if user.is_authenticated and user.email == settings.ADMIN_EMAIL:
            return Ledger.objects.all().order_by('-created_at')
        else:
            return Ledger.objects.filter(is_published=True).order_by('-created_at')
        
    
    @action(detail= True, methods=['get'])
    def summary(self, request, pk=None):
        ledger= self.get_object()
        transactions= ledger.transactions.all().order_by('-created_at')
        search= request.GET.get("search", "").strip()
        if search:
            display_transactions= transactions.filter(
                Q(title__icontains=search) | Q(subcategory__name__icontains=search)
            )
        else:
            display_transactions= transactions
        
        total_revenue= transactions.filter(transaction_type__iexact='revenue').aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense= transactions.filter(transaction_type__iexact='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        
        revenue_by_subcategory= transactions.filter(transaction_type__iexact='revenue')\
        .values('subcategory__name')\
        .annotate(total=Sum('amount'))\
        .order_by('subcategory__name')
            
        expense_by_subcategory= transactions.filter(transaction_type__iexact='expense')\
            .values('subcategory__name')\
            .annotate(total=Sum('amount'))\
            .order_by('subcategory__name')
        
        net_balance=total_revenue-total_expense
        transaction_data= TransactionSerializer(display_transactions, many=True).data
        return Response({
            'ledger_name': ledger.name,
            'total_revenue': total_revenue,
            'total_expense': total_expense,
            'net_balance': net_balance,
            'transactions': transaction_data,
            'revenue_breakdown': revenue_by_subcategory,
            'expense_breakdown': expense_by_subcategory
        })
        
    @action(detail= True, methods=['get'])
    def ledgerSummary(self, request, pk=None):
        ledger= self.get_object()
        transactions= ledger.transactions.all().order_by('-created_at')
        total_revenue= transactions.filter(transaction_type__iexact='revenue').aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense= transactions.filter(transaction_type__iexact='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        
        revenue_by_subcategory= transactions.filter(transaction_type__iexact='revenue')\
        .values('subcategory__name')\
        .annotate(total=Sum('amount'))\
        .order_by('subcategory__name')
            
        expense_by_subcategory= transactions.filter(transaction_type__iexact='expense')\
            .values('subcategory__name')\
            .annotate(total=Sum('amount'))\
            .order_by('subcategory__name')
        
        net_balance=total_revenue-total_expense
        return Response({
            'ledger_name': ledger.name,
            'total_revenue': total_revenue,
            'total_expense': total_expense,
            'net_balance': net_balance,
            'revenue_breakdown': revenue_by_subcategory,
            'expense_breakdown': expense_by_subcategory
        })
        
class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer
    permission_classes= [IsCRCUserOrReadOnly]

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-created_at')
    serializer_class = TransactionSerializer
    permission_classes= [IsCRC]
    
    @action(detail=True, methods=['post'])
    def generate_paylet(self, request, pk=None):
        transaction= self.get_object()
        data= request.data
        format_type= request.query_params.get('file_ext', 'docx')
        
        template= PayletTemplate.objects.first()
        if not template:
            return Response({'error':'no paylet template added. rookie move'}, status=404)
        
        template_path=template.file.path
        
        is_advance= transaction.subcategory.name.lower() == 'advance'
        addressee= 'Dean, Administration' if is_advance else 'Associate Dean, SWD'
        date= timezone.now().strftime("%B %d, %Y")
        
        ledger_name= ' '.join(transaction.ledger.name.split('-'))
        if ledger_name.lower().startswith('apogee'):
            ledger_name=ledger_name.upper()
        elif ledger_name.startswith('su'):
            ledger_name= 'SU'
        else:
            ledger_name=ledger_name.capitalize()
        
        team=ledger_name.split()[0]
        if (team=='SU'):
            team="Students' Union"
        else:
            team='Team '+team
        
        
        context={
            'addressee': addressee,
            'date': date,
            'team': team,
            'payee_name': data.get('payee',''),
            'reason': data.get('reason', ''),
            'amount': f"Rs. {transaction.amount:,.2f}",
            'ledger_name': ledger_name,
            'acc_name': data.get('accName', ''),
            'acc_number': data.get('accNo', ''),
            'bank': data.get('bank', ''),
            'ifsc': data.get('ifsc', ''),
            'pan': data.get('pan', ''),
            'gstin': data.get('gstin', '')
        }
        if (transaction.transaction_type.lower()=='revenue' or transaction.subcategory.name.lower()=='prize money'):
            subject= context['reason']
            body=subject
        else:
            subject=f'payment to {context['payee_name']} for {context['reason']}'
            body= 'processing of a '+subject
            if is_advance: 
                subject='advance '+ subject
                body='processing of an '+ subject
                
        subject=titlecase(subject)
        context['subject']=subject
        context['body']=body
        
        Paylet.objects.create(
            transaction=transaction,
            payee_name= context['payee_name'],
            reason_for= context['reason'].capitalize(),
            acc_name= context['acc_name'],
            acc_number= context['acc_number'],
            bank= context['bank'],
            ifsc= context['ifsc'],
            pan=context['pan'],
            gstin=context['gstin']
        )
        
        doc=DocxTemplate(template_path)
        doc.render(context)
        
        temp_dir= tempfile.gettempdir()
        docx_path=os.path.join(temp_dir, f'paylet_{transaction.id}.docx')
        doc.save(docx_path)
        
        """if format_type=='pdf':
            pdf_path=os.path.join(temp_dir, f'paylet_{transaction.id}.pdf')
            
            try:
                convert(docx_path, pdf_path)
                with open(pdf_path, 'rb') as pdf:
                    response = HttpResponse(pdf.read(), content_type='application/pdf')
                    response['Content-Disposition'] = f'attachment; filename="Paylet_{transaction.title}.pdf"'
                
                os.remove(pdf_path)
                os.remove(docx_path)
                return response
                
            except Exception as e:
                if os.path.exists(docx_path): 
                    os.remove(docx_path)
                if os.path.exists(pdf_path): 
                    os.remove(pdf_path)
                    
                return Response({"error": "PDF generation failed"}, status=500)"""
        
        with open(docx_path, 'rb') as docx:
            response = HttpResponse(docx.read(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = f'attachment; filename="Paylet_{transaction.title}.docx"'
    
        os.remove(docx_path)
        return response

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes= [IsCRC]

class PayletViewSet(viewsets.ModelViewSet):
    queryset = Paylet.objects.all()
    serializer_class = PayletSerializer
    permission_classes= [IsCRC]

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by('-created_at')
    serializer_class = AnnouncementSerializer
    permission_classes= [IsCRCUserOrReadOnly]

class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all().order_by('-created_at') #newest first
    serializer_class = QuerySerializer
    permission_classes = [IsQueryOwnerOrCRC]
    
    def get_queryset(self):
        user= self.request.user
        if user.email ==settings.ADMIN_EMAIL:
            return Query.objects.all().order_by('-created_at')
        else:
            return Query.objects.filter(user=user).order_by('-created_at')
        
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PayletTemplateUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request, *args, **kwargs):
        template = PayletTemplate.objects.first()
        if template:
            return Response({
                "exists": True,
                "uploaded_at": template.uploaded_at.strftime('%d %b %Y')
            }, status=200)
        return Response({"exists": False}, status=200)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file provided."}, status=400)

        old_templates = PayletTemplate.objects.all()
        for template in old_templates:
            if template.file:
                template.file.delete(save=False) 
            template.delete() 

        PayletTemplate.objects.create(file=file_obj)

        return Response({"message": "Template successfully updated!"}, status=201)