from django_filters import rest_framework as filters
from .models import Event, SportType


class EventFilter(filters.FilterSet):
    start_date = filters.DateFromToRangeFilter(field_name='start_date', label='Дата начала')
    end_date = filters.DateFromToRangeFilter(field_name='end_date', label='Дата окончания')

    participants = filters.RangeFilter(field_name='participants', label='Количество участников')

    sport_type = filters.ModelMultipleChoiceFilter(
        queryset=SportType.objects.all(),  # Используем ForeignKey SportType
        label='Тип спорта'
    )

    gender = filters.ChoiceFilter(choices=Event.GENDER_CHOICES, label='Пол')

    country = filters.CharFilter(field_name='country', lookup_expr='icontains', label='Страна')
    region = filters.CharFilter(field_name='region', lookup_expr='icontains', label='Регион')
    city = filters.CharFilter(field_name='city', lookup_expr='icontains', label='Город')

    ordering = filters.OrderingFilter(
        fields=(
            ('start_date', 'start_date'),
            ('participants', 'participants'),
            ('country', 'country'),
            ('region', 'region'),
            ('city', 'city'),
        ),
        label='Сортировка'
    )

    class Meta:
        model = Event
        fields = {
            'location': ['exact', 'icontains'],
            'event_type': ['exact', 'icontains'],
            'age_group': ['exact'],
            'is_cancelled': ['exact'],
        }
