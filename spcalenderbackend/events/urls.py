# events/urls.py
from django.urls import path
from .views import EventListView, StatisticsView, SportTypeListView, CompetitionListView

urlpatterns = [
    path('list/', EventListView.as_view(), name='event-list'),
    path('statistics/', StatisticsView.as_view(), name='statistics'),
    path('sport-types/', SportTypeListView.as_view(), name='sport-types'),
    path('competitions/', CompetitionListView.as_view(), name='competitions'),
]
