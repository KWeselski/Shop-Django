from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal
# Create your models here.

DELIVERY_CHOICES = (
    ('S','Store'),
    ('O','Online'),
)

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    
    def __str__(self):
        return 'Profile: {}'.format(self.user.username)

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    def __str__(self):
        return self.name
    

class Product(models.Model):
    name = models.CharField(max_length=200,db_index=True)
    category = models.ForeignKey(Category,related_name='products',on_delete=models.CASCADE)
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='./frontend/static/images/products/', blank=True)
    description = models.TextField(blank=True)
    price = models.FloatField()
    on_discount = models.BooleanField(default=False)
    discount_price = models.FloatField(blank=True, null=True)
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        index_together = (('id', 'slug'),)

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete= models.CASCADE)    
    item = models.ForeignKey(Product, on_delete=models.CASCADE)   
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"Id {self.id} x {self.quantity} of {self.item.name}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_discount_price(self):
        return self.quantity * self.item.discount_price 

    def get_final_price(self):
        if (self.item.on_discount):
            return self.get_total_discount_price()
        return self.get_total_item_price() 

class Coupon(models.Model):
    code = models.CharField(max_length=50,unique=True)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.IntegerField(validators=[MinValueValidator(0),
                                MaxValueValidator(100)])
    active = models.BooleanField()

    def __str__(self):
        return self.code

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete= models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    delivery_address = models.ForeignKey('Address', verbose_name=("delivery_adresses"), on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey(Coupon, related_name='orders',on_delete=models.SET_NULL, null=True,blank=True)
    discount = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return f"Order number :{self.id}"

    def get_total(self):
        total=0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        total = total - total * (self.discount/ 100)
        return total
    
    def get_total_before(self):
        total=0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total


class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    street_address = models.CharField(max_length=75)
    apartment_address = models.CharField(max_length=75)
    city = models.CharField(max_length=75)
    postal_code = models.CharField(max_length=75)
    delivery_type = models.CharField(max_length=1,choices=DELIVERY_CHOICES)

    def __str__(self):
        return self.user.username
    
    class Meta:
        verbose_name_plural = 'Addresses'

class Opinion(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    opinion = models.CharField(max_length=250)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username




