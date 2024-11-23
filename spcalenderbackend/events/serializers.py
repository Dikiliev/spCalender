# events/serializers.py
from rest_framework import serializers
from .models import Event, SportType

class SportTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportType
        fields = ['id', 'name']

class EventSerializer(serializers.ModelSerializer):
    sport_type = SportTypeSerializer()  # Вложенный сериализатор для отображения данных типа спорта

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'sport_type', 'country', 'region', 'city',
            'location', 'start_date', 'end_date', 'participants',
            'gender', 'age_group', 'event_type', 'description', 'program', 'is_cancelled'
        ]
