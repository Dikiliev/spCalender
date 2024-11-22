# events/filters.py
import django_filters
from .models import Event

class EventFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name="start_date", lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name="end_date", lookup_expr='lte')
    sport_type = django_filters.CharFilter(field_name="sport_type__name", lookup_expr='icontains')
    location = django_filters.CharFilter(field_name="location", lookup_expr='icontains')

    class Meta:
        model = Event
        fields = ['sport_type', 'start_date', 'end_date', 'location']
