from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Event
from .serializers import EventSerializer
from .filters import EventFilter
from rest_framework.generics import ListAPIView
from django.db.models import Count, F, Q, Sum
from rest_framework import status


class EventListView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = EventFilter

    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date', 'end_date', 'participants']

    ordering = ['start_date']

    def get_queryset(self):
        qs = super().get_queryset()
        print(f"GET params: {self.request.GET}")  # Посмотрите, какие параметры приходят
        print(f"Filtered queryset: {qs.query}")  # Убедитесь, что фильтры применились
        return qs


class StatisticsView(APIView):
    def get(self, request):
        city = request.query_params.get('city')
        sport_type = request.query_params.get('sportType')

        # Фильтры для запроса
        filters = Q()
        if city and city != 'Все города':
            filters &= Q(city__icontains=city)
        if sport_type and sport_type != 'Все виды спорта':
            filters &= Q(sport_type__name__icontains=sport_type)

        # Мероприятия по дням
        event_data_by_days = (
            Event.objects.filter(filters)
            .values(day=F('start_date__date'))
            .annotate(events=Count('id'))
            .order_by('day')
        )

        # Топ-10 по количеству мероприятий
        top_events_by_count = (
            Event.objects.filter(filters)
            .values(sport=F('sport_type__name'))
            .annotate(events=Count('id'))
            .order_by('-events')[:10]
        )

        # Топ-10 по количеству участников
        top_events_by_participants = (
            Event.objects.filter(filters)
            .values(sport=F('sport_type__name'))
            .annotate(participants=Sum('participants'))
            .order_by('-participants')[:10]
        )

        # Возрастная статистика
        # age_data = (
        #     Event.objects.filter(filters)
        #     .values(age=F('age_group'))
        #     .annotate(count=Count('id'))
        #     .order_by('age')
        # )

        age_data = (
            Event.objects.filter(filters)
            .values(age=F('age_group'))
            .annotate(count=Sum('participants'))  # Суммируем количество участников
            .order_by('age')
        )

        return Response(
            {
                'eventDataByDays': list(event_data_by_days),
                'topEventsByCount': list(top_events_by_count),
                'topEventsByParticipants': list(top_events_by_participants),
                'ageData': list(age_data),
            },
            status=status.HTTP_200_OK,
        )
