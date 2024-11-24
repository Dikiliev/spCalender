# events/serializers.py
from rest_framework import serializers
from .models import Event, SportType, CompetitionType

class SportTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportType
        fields = ['id', 'name']

class CompetitionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetitionType
        fields = ['id', 'name']


class EventSerializer(serializers.ModelSerializer):
    sport_type = SportTypeSerializer()
    competition = CompetitionTypeSerializer()

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'sport_type', 'competition', 'country', 'region', 'city',
            'location', 'start_date', 'end_date', 'participants',
            'gender', 'age_group', 'event_type', 'description', 'program', 'is_cancelled'
        ]
