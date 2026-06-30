from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CRC, Ledger, Subcategory, Transaction, Vendor, Paylet, Announcement, Query

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'email', 'first_name', 'last_name', 'is_staff')
        read_only_fields = ('pk', 'email', 'is_staff')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CRCSerializer(serializers.ModelSerializer):
    class Meta:
        model = CRC
        fields = '__all__' # Automatically grabs name, bits_id, role, avatar, etc.

class LedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ledger
        fields = '__all__'

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'
        
class PayletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paylet
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    ledger_name = serializers.CharField(source='ledger.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    class Meta:
        model = Transaction
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = '__all__'