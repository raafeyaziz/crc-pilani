from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.core.exceptions import PermissionDenied
from django.conf import settings
from django.contrib.auth.models import User


class BITSAccountAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):
        email = sociallogin.account.extra_data.get("email", "").lower()

        if not email.endswith("@pilani.bits-pilani.ac.in"):
            raise PermissionDenied("Sign in with a valid BITS ID")

        
        if sociallogin.is_existing:
            return

        
        try:
            existing_user = User.objects.get(email__iexact=email)
            sociallogin.connect(request, existing_user)
        except User.DoesNotExist:
            pass

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)

        email = user.email.lower()

        if email == settings.ADMIN_EMAIL.lower():
            user.is_staff = True
            user.is_superuser = True
        else:
            user.is_staff = False
            user.is_superuser = False

        user.save()
        return user