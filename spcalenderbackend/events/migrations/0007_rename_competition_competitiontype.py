# Generated by Django 5.1.3 on 2024-11-24 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_competition_event_competition'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Competition',
            new_name='CompetitionType',
        ),
    ]