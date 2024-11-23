from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Event
from .serializers import EventSerializer
from .filters import EventFilter
from rest_framework.generics import ListAPIView


class EventListView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = EventFilter

    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date', 'end_date', 'participants']

    ordering = ['start_date']
