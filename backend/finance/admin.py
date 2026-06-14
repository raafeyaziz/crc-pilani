from django.contrib import admin
from .models import CRC, Ledger, Subcategory, Transaction, Vendor, Paylet, Announcement, Query
# Register your models here.
admin.site.register(CRC)
admin.site.register(Ledger)
admin.site.register(Subcategory)
admin.site.register(Transaction)
admin.site.register(Vendor)
admin.site.register(Paylet)
admin.site.register(Announcement)
admin.site.register(Query)