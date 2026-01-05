from django.urls import path
from .views import CandidateList,CastVote

urlpatterns = [
    path('candidates/', CandidateList.as_view(), name='candidate-list'),
    path('vote/', CastVote.as_view(), name='cast-vote'),
]