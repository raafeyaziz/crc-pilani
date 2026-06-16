from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CRCViewSet, LedgerViewSet, SubcategoryViewSet, 
    TransactionViewSet, VendorViewSet, PayletViewSet, 
    AnnouncementViewSet, QueryViewSet
)
router = DefaultRouter()

router.register(r'crc-members', CRCViewSet)
router.register(r'ledgers', LedgerViewSet)
router.register(r'subcategories', SubcategoryViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'vendors', VendorViewSet)
router.register(r'paylets', PayletViewSet)
router.register(r'announcements', AnnouncementViewSet)
router.register(r'queries', QueryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]