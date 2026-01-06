from django.contrib import admin
from .models import Candidate, VoteTransaction

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('candidate_number', 'name', 'category', 'vote_count')
    list_filter = ('category',)
    search_fields = ('name',)
    actions = ['reset_votes_to_zero'] # <--- Add the action button

    # Define the action function
    @admin.action(description='Reset selected candidates to 0 votes')
    def reset_votes_to_zero(self, request, queryset):
        rows_updated = queryset.update(vote_count=0)
        self.message_user(request, f"{rows_updated} candidates have been reset to 0 votes.")
        
        
@admin.register(VoteTransaction)
class VoteTransactionAdmin(admin.ModelAdmin):
    list_display = ('device_id', 'candidate', 'timestamp')
    readonly_fields = ('device_id', 'candidate', 'timestamp', 'ip_address')