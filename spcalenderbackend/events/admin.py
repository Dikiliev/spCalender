from django.contrib import admin

from events.models import SportType, Event

admin.site.register(SportType)
admin.site.register(Event)