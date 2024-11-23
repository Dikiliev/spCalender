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

    # Поле для сортировки
    ordering = filters.OrderingFilter(
        fields=(
            ('start_date', 'start_date'),  # Сортировка по дате начала
            ('participants', 'participants'),  # Сортировка по количеству участников
            ('-start_date', '-start_date'),  # Сортировка по дате начала (обратный порядок)
            ('-participants', '-participants'),  # Сортировка по количеству участников (обратный порядок)
        )
    )

    class Meta:
        model = Event
        fields = {
            'location': ['exact', 'icontains'],
            'event_type': ['exact', 'icontains'],
            'age_group': ['exact'],
            'is_cancelled': ['exact'],
        }
