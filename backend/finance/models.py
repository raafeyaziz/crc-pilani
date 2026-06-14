from django.db import models
from django.contrib.auth.models import User

# Create your models here.
#1
class CRC(models.Model):
    name= models.CharField(max_length=255)
    bits_id= models.CharField(max_length=20, unique=True)
    role= models.CharField(max_length=15)
    
    avatar= models.ImageField(upload_to='crc_avatars/',
                              blank=True, null=True)
    
    instagram= models.URLField(blank=True, null=True)
    linkedin= models.URLField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} - {self.role}"
#2
class Ledger(models.Model):
    name= models.CharField(max_length=25, unique=True)
    is_published= models.BooleanField(default= False)
    created_at= models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
#3
class Subcategory(models.Model):
    name= models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
 #4     
class Transaction(models.Model):
    TRANSACTION_TYPES= [('revenue', 'Revenue'),
                        ('expense', 'Expense')]
    title= models.CharField(max_length=255)
    ledger= models.ForeignKey(Ledger, on_delete=models.CASCADE,
                              related_name='transactions')
    
    
    subCategory= models.ForeignKey(Subcategory,
                                   on_delete=models.SET_NULL,
                                   related_name='transactions',
                                   null=True)
    
    amount= models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type=models.CharField(max_length=10, 
                                      choices=TRANSACTION_TYPES)
    
    created_at= models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.ledger} - {self.title}"
#5
class Vendor(models.Model):
    name = models.CharField(max_length=255, unique=True)
    acc_name = models.CharField(max_length=255)
    acc_number = models.CharField(max_length=50)
    bank = models.CharField(max_length=255)
    ifsc = models.CharField(max_length=20)
    pan = models.CharField(max_length=20, blank=True, null=True)
    gstin = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name
#6
class Paylet(models.Model):
    transaction = models.OneToOneField(Transaction,
                                       on_delete=models.CASCADE,
                                       related_name='paylet')
    
    payee_name = models.CharField(max_length=255)
    reason_for = models.CharField(max_length=255) 
    acc_name = models.CharField(max_length=255)
    acc_number = models.CharField(max_length=50)
    bank = models.CharField(max_length=255)
    ifsc = models.CharField(max_length=20)
    pan = models.CharField(max_length=20, blank=True, null=True)
    gstin = models.CharField(max_length=20, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        Vendor.objects.update_or_create(
            name=self.payee_name,
            defaults={
                'acc_name': self.acc_name,
                'acc_number': self.acc_number,
                'bank': self.bank,
                'ifsc': self.ifsc,
                'pan': self.pan,
                'gstin': self.gstin
            }
        )
        
        super().save(*args, **kwargs)
    
#7
class Announcement(models.Model):
    title= models.CharField(max_length=255)
    body= models.TextField()
    created_at= models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
#8
class Query(models.Model):
    QUERY_CATEGORIES=[('cabs', 'Cabs'),
                      ('merch', 'Merch'),
                      ('recruitments', 'Recruitments'),
                      ('fees', 'Fees'),
                      ('other', 'Other')]
    
    user=models.ForeignKey(User,
                           on_delete=models.CASCADE, 
                           related_name='queries')
    
    subject = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=QUERY_CATEGORIES)
    
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)