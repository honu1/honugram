# Generated by Django 2.0.7 on 2018-09-09 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0023_auto_20180901_2059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('not-specified', 'Not-specified'), ('female', 'Female')], max_length=80, null=True),
        ),
    ]
