from django import forms
from .models import Order

class CouponForm(forms.Form):
    code = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Promo code',
        'aria-label': 'Recipient\'s username',
        'aria-describedby': 'basic-addon2'
    }))


class OrderForm(forms.ModelForm):

    class Meta:
        model = Order
        fields = [
            'name', 'surname', 'company', 'phone', 'street', 'city',
            'zip_code'
        ]
