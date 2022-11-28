from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from decimal import Decimal
from phone_field import PhoneField
# Create your models here.

DELIVERY_CHOICES = (
    ('S', 'Store'),
    ('O', 'Online'),
)


class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    def __str__(self):
        return self.name


class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user} wishlist"


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
    wishlists = models.ManyToManyField(Wishlist, related_name='wishlists')

    class Meta:
        index_together = (('id', 'slug'),)
        ordering = ('name',)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    company = models.CharField(max_length=250, blank=True)
    street = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    phone = models.CharField(validators=[RegexValidator(regex=r"^\+?[1-9][0-9]{7,14}$")], max_length=16)
    zip_code = models.CharField(max_length=20)
    discount = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    ordered = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created",)

    def __str__(self):
        return f"Order number :{self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"Id {self.id} x {self.quantity} of {self.product.name}"

    def get_total_item_price(self):
        return self.quantity * self.product.price

    def get_total_discount_price(self):
        return self.quantity * self.product.discount_price

    def get_final_price(self):
        if (self.product.on_discount):
            return self.get_total_discount_price()
        return self.get_total_item_price()


class Coupon(models.Model):
    active = models.BooleanField()
    code = models.CharField(max_length=50, unique=True)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    discount = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return self.code

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
    date_time = models.DateTimeField(auto_now_add=True)
    opinion = models.CharField(max_length=250)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0, validators=[
                                 MinValueValidator(0), MaxValueValidator(5)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    def date(self):
        return self.date_time.strftime('%B %d %Y')


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    wishlist = models.OneToOneField(
        Wishlist, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return 'Profile: {}'.format(self.user.username)
