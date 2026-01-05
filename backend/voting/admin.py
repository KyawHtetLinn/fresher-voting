from django.contrib import admin
from .models import Candidate, VoteTransaction

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    # This determines what columns you see in the list
    list_display = ('candidate_number', 'name', 'category', 'vote_count')
    # This lets you filter by category on the right side
    list_filter = ('category',)
    # This lets you search by name
    search_fields = ('name',)

@admin.register(VoteTransaction)
class VoteTransactionAdmin(admin.ModelAdmin):
    list_display = ('device_id', 'candidate', 'timestamp')
    readonly_fields = ('device_id', 'candidate', 'timestamp', 'ip_address')