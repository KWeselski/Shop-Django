from django.contrib import admin
from django.utils.safestring import mark_safe
from django.urls import reverse
from .models import Category, Product, Order, OrderItem, Coupon, Address, Opinion, Wishlist
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'category', 'price',
                    'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'available']
    filter_horizontal = ('wishlists',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'created', 'ordered', 'paid', ]
    list_display_links = ['user']
    list_filter = ['ordered', 'user', 'paid']
    search_fields = ['user__username', ]

    def get_items(self, obj):
        return "\n".join([str(i.item) for i in obj.items.all()])


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'get_final_price']


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'valid_from', 'valid_to', 'discount', 'active']
    list_filter = ['active', 'valid_from', 'valid_to']
    search_fields = ['code']


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'street_address', 'apartment_address', 'city',
                    'postal_code', 'delivery_type', ]
    list_filter = ['delivery_type', 'city']
    search_fields = ['user', 'street_address',
                     'apartment_address', 'postal_code']


@admin.register(Opinion)
class OpinionAdmin(admin.ModelAdmin):
    list_display = ['date', 'user', 'product', 'opinion', 'rating']

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user']
