# Generated by Django 5.1.3 on 2024-11-23 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='program',
            field=models.TextField(blank=True, null=True),
        ),
    ]