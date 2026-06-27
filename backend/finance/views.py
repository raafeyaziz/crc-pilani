from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .permissions import IsCRC, IsCRCUserOrReadOnly, IsQueryOwnerOrCRC
from .models import CRC, Ledger, Subcategory, Transaction, Vendor, Paylet, Announcement, Query
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
    queryset = Ledger.objects.all()
    serializer_class = LedgerSerializer
    permission_classes= [IsCRCUserOrReadOnly]

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer
    permission_classes= [IsCRCUserOrReadOnly]

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-created_at')
    serializer_class = TransactionSerializer
    permission_classes= [IsCRC]

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
