from django.contrib import admin
from .models import Category,Product,Order, OrderItem
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug','category', 'price',
                'available','created','updated']
    list_filter = ['available','created','updated']
    list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    fields = ['items','ordered_date','ordered']
    
    list_display = ['id','start_date','ordered_date','ordered','get_total',]
    filter_horizontal = ('items',)

    def get_items(self,obj):
        return "\n".join([str(i.item) for i in obj.items.all()])

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['item','quantity']