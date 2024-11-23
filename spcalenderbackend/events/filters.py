from django_filters import rest_framework as filters
from .models import Event

class EventFilter(filters.FilterSet):
    start_date = filters.DateFromToRangeFilter(field_name='start_date', label='Дата начала')
    end_date = filters.DateFromToRangeFilter(field_name='end_date', label='Дата окончания')
    participants = filters.RangeFilter(field_name='participants', label='Количество участников')
    sport_type = filters.ModelMultipleChoiceFilter(
        queryset=Event.objects.values_list('sport_type__name', flat=True).distinct(),
        label='Тип спорта'
    )
    gender = filters.ChoiceFilter(choices=Event.GENDER_CHOICES, label='Пол')

    class Meta:
        model = Event
        fields = {
            'location': ['exact', 'icontains'],  # Фильтрация точного совпадения и частичного совпадения
            'event_type': ['exact', 'icontains'],  # Тип события
            'age_group': ['exact'],  # Возрастная группа
            'is_cancelled': ['exact'],  # Фильтрация по отменённым событиям
        }
