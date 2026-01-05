from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Candidate, VoteTransaction
from .serializers import VoteSerializer
from .serializers import CandidateSerializer
class CandidateList(generics.ListAPIView):
    queryset = Candidate.objects.all().order_by('candidate_number')
    serializer_class = CandidateSerializer
    
class CastVote(APIView):
    def post(self, request):
        serializer = VoteSerializer(data=request.data)
        
        # 1. Check if data is valid (did they send IDs?)
        if serializer.is_valid():
            candidate_id = serializer.validated_data['candidate_id']
            device_id = serializer.validated_data['device_id']
            
            # 2. Get the Candidate (or return 404 if not found)
            candidate = get_object_or_404(Candidate, pk=candidate_id)
            
            # 3. SECURITY CHECK: Has this device voted in THIS category before?
            # We look for a transaction with the same Device ID AND the same Category.
            already_voted = VoteTransaction.objects.filter(
                device_id=device_id, 
                candidate__category=candidate.category
            ).exists()
            
            if already_voted:
                return Response(
                    {"message": f"You have already voted for {candidate.category}!"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # 4. If Safe: Record the Vote
            # A. Create the transaction record (The paper trail)
            VoteTransaction.objects.create(
                candidate=candidate,
                device_id=device_id,
                ip_address=request.META.get('REMOTE_ADDR') # Optional: capture IP
            )
            
            # B. Update the count (The scoreboard)
            candidate.vote_count += 1
            candidate.save()
            
            return Response(
                {"message": "Vote successful!", "new_count": candidate.vote_count}, 
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)