from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.conf import settings

class IsCRC(BasePermission):
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return request.user.email == settings.ADMIN_EMAIL
    
class IsCRCUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        if request.method in SAFE_METHODS:
            return True
        
        return request.user.email == settings.ADMIN_EMAIL

class IsQueryOwnerOrCRC(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        if request.method in ['GET', 'POST', 'HEAD', 'OPTIONS']:
            return True
        
        return request.user.email == settings.ADMIN_EMAIL
