from django_filters import rest_framework as filters
from .models import Event, SportType, CompetitionType


class EventFilter(filters.FilterSet):
    start_date = filters.DateFromToRangeFilter(
        field_name='start_date',
        label='Дата начала'
    )
    end_date = filters.DateFromToRangeFilter(
        field_name='end_date',
        label='Дата окончания'
    )
    participants_after = filters.NumberFilter(
        field_name='participants', lookup_expr='gte', label='Минимальное количество участников'
    )
    participants_before = filters.NumberFilter(
        field_name='participants', lookup_expr='lte', label='Максимальное количество участников'
    )

    sport_type = filters.ModelChoiceFilter(
        queryset=SportType.objects.all(),
        label='Тип спорта',
        to_field_name='id',
        field_name='sport_type',  # Поле модели Event
    )

    competition = filters.ModelChoiceFilter(
        queryset=CompetitionType.objects.all(),
        label='Тип соревнования',
        to_field_name='id',
        field_name='competition',
    )

    gender = filters.ChoiceFilter(choices=Event.GENDER_CHOICES, label='Пол')

    location = filters.CharFilter(field_name='location', lookup_expr='icontains', label='Местоположение')
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
