# Generated by Django 4.1.3 on 2022-11-03 13:52

from django.db import migrations
import phone_field.models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0026_auto_20221103_0315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='phone',
            field=phone_field.models.PhoneField(max_length=31),
        ),
    ]