# Generated by Django 3.1.4 on 2022-08-27 20:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0020_auto_20210114_1914'),
    ]

    operations = [
        migrations.RenameField(
            model_name='opinion',
            old_name='date_added',
            new_name='date',
        ),
    ]
