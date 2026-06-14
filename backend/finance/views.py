from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import CRC, Ledger, Subcategory, Transaction, Vendor, Paylet, Announcement, Query
from .serializers import (
    CRCSerializer, LedgerSerializer, SubcategorySerializer, 
    TransactionSerializer, VendorSerializer, PayletSerializer, 
    AnnouncementSerializer, QuerySerializer
)

# Create your views here.

class CRCViewSet(viewsets.ModelViewSet):
    queryset = CRC.objects.all()
    serializer_class = CRCSerializer

class LedgerViewSet(viewsets.ModelViewSet):
    queryset = Ledger.objects.all()
    serializer_class = LedgerSerializer

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-created_at') # Orders by newest first
    serializer_class = TransactionSerializer

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class PayletViewSet(viewsets.ModelViewSet):
    queryset = Paylet.objects.all()
    serializer_class = PayletSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by('-created_at') # Orders by newest first
    serializer_class = AnnouncementSerializer

class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all().order_by('-created_at') # Orders by newest first
    serializer_class = QuerySerializer
    permission_classes = [IsAuthenticated]
    
    # We briefly discussed this earlier: injecting the user automatically
    def perform_create(self, serializer):
        # We will properly attach the actual logged-in user when authentication is set up.
        # For now, if you are testing without auth, you might need to handle this conditionally.
        serializer.save(user=self.request.user)
