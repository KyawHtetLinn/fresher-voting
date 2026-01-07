from django.contrib import admin
from .models import Candidate, VoteTransaction, King, Queen, Mister, Miss

# 1. The Master List (Shows everyone)
@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('candidate_number', 'name', 'category', 'vote_count')
    list_filter = ('category',)
    search_fields = ('name', 'candidate_number')
    ordering = ['category', 'candidate_number'] # Groups them nicely
    actions = ['reset_votes_to_zero']

    @admin.action(description='Reset selected candidates to 0 votes')
    def reset_votes_to_zero(self, request, queryset):
        queryset.update(vote_count=0)

class BaseCategoryAdmin(admin.ModelAdmin):
    list_display = ('candidate_number', 'name', 'vote_count')
    ordering = ['candidate_number']
    exclude = ('category',) 

@admin.register(King)
class KingAdmin(BaseCategoryAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(category='KING')
    
    # ▼▼▼ FIX: Force category to KING on save ▼▼▼
    def save_model(self, request, obj, form, change):
        obj.category = 'KING'
        super().save_model(request, obj, form, change)

@admin.register(Queen)
class QueenAdmin(BaseCategoryAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(category='QUEEN')

    def save_model(self, request, obj, form, change):
        obj.category = 'QUEEN'
        super().save_model(request, obj, form, change)

@admin.register(Mister)
class MisterAdmin(BaseCategoryAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(category='MISTER')

    def save_model(self, request, obj, form, change):
        obj.category = 'MISTER'
        super().save_model(request, obj, form, change)

@admin.register(Miss)
class MissAdmin(BaseCategoryAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).filter(category='MISS')

    def save_model(self, request, obj, form, change):
        obj.category = 'MISS'
        super().save_model(request, obj, form, change)
# 3. Transaction Logs
@admin.register(VoteTransaction)
class VoteTransactionAdmin(admin.ModelAdmin):
    list_display = ('candidate', 'device_id', 'timestamp')
    list_filter = ('timestamp', 'candidate__category')
    search_fields = ('device_id',)