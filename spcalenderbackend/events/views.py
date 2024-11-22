# events/views.py
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Event
from .serializers import EventSerializer

class EventListView(ListAPIView):
    queryset = Event.objects.all().order_by('start_date')
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sport_type', 'location']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date', 'end_date']
