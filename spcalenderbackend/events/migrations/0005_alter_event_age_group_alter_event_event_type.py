# Generated by Django 5.1.3 on 2024-11-24 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_alter_event_city_alter_event_country_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='age_group',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='event',
            name='event_type',
            field=models.CharField(max_length=150),
        ),
    ]