from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal
# Create your models here.

DELIVERY_CHOICES = (
    ('S', 'Store'),
    ('O', 'Online'),
)


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return 'Profile: {}'.format(self.user.username)


class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    available = models.BooleanField(default=True)
    category = models.ForeignKey(
        Category, related_name='products', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    discount_price = models.FloatField(blank=True, null=True)
    image = models.ImageField(
        upload_to='./frontend/static/images/products/', blank=True)
    name = models.CharField(max_length=200, db_index=True)
    on_discount = models.BooleanField(default=False)
    price = models.FloatField()
    slug = models.SlugField(max_length=200, db_index=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        index_together = (('id', 'slug'),)
        ordering = ('name',)

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
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
    active = models.BooleanField()
    code = models.CharField(max_length=50, unique=True)
    discount = models.IntegerField(validators=[MinValueValidator(0),
                                               valid_from=models.DateTimeField()
                                               valid_to=models.DateTimeField() MaxValueValidator(100)])

    def __str__(self):
        return self.code


class Order(models.Model):
    coupon = models.ForeignKey(
        Coupon, related_name='orders', on_delete=models.SET_NULL, null=True, blank=True)
    delivery_address = models.ForeignKey('Address', verbose_name=(
        "delivery_adresses"), on_delete=models.SET_NULL, blank=True, null=True)
    discount = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    items = models.ManyToManyField(OrderItem)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    start_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return f"Order number :{self.id}"

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        total = total - total * (self.discount / 100)
        return total

    def get_total_before(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total


class Address(models.Model):
    apartment_address = models.CharField(max_length=75)
    city = models.CharField(max_length=75)
    delivery_type = models.CharField(max_length=1, choices=DELIVERY_CHOICES)
    postal_code = models.CharField(max_length=75)
    street_address = models.CharField(max_length=75)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = 'Addresses'


class Opinion(models.Model):
    date_added = models.DateTimeField(auto_now_add=True)
    opinion = models.CharField(max_length=250)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0, validators=[
                                 MinValueValidator(0), MaxValueValidator(5)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
