from django.db import models

class Candidate(models.Model):
    # We only have 4 voting categories now.
    # Prince, Princess, and Popular are just "winners" from these lists.
    CATEGORY_CHOICES = (
        ('KING', 'King ( & Prince/Popular)'),
        ('QUEEN', 'Queen ( & Princess/Popular)'),
        ('MISTER', 'Mister'),
        ('MISS', 'Miss'),
    )
    
    candidate_number = models.IntegerField(help_text="Candidate Number (e.g. 1)")
    name = models.CharField(max_length=100)
    # This determines which list they appear in
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    vote_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('category', 'candidate_number')

    def __str__(self):
        return f"#{self.candidate_number} {self.name} - {self.get_category_display()}"

class VoteTransaction(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    device_id = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Vote by {self.device_id}"