from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.core.exceptions import PermissionDenied
from django.conf import settings

class BITSAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        email= sociallogin.account.extra_data.get("email", '')
        if not email.endswith("@pilani.bits-pilani.ac.in"):
            raise PermissionDenied("Sign in with a valid BITS ID")
        
    def save_user(self, request, sociallogin, form=None):
        
        user= super().save_user(request, sociallogin, form)
        email= user.email
        
        if email == settings.ADMIN_EMAIL:
            user.is_staff= True
            user.is_superuser= True
        else:
            user.is_staff= False
            user.is_superuser= False
        
        user.save()
        return user