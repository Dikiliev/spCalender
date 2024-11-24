from django.contrib import admin

from events.models import SportType, Event, CompetitionType

admin.site.register(SportType)
admin.site.register(CompetitionType)
admin.site.register(Event)