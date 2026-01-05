from rest_framework import serializers
from .models import Candidate

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['id', 'candidate_number', 'name', 'category', 'vote_count']
        
class VoteSerializer(serializers.Serializer):
    candidate_id = serializers.IntegerField()
    device_id = serializers.CharField(max_length=100)