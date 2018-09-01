from django.db import models
from honugram.users import models as user_models
from honugram.images import models as image_models

# Create your models here.
class Notification(image_models.TimeStampModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('commnent', 'Comment'),
        ('follow', 'Follow' ),
    )

    creator = models.ForeignKey(user_models.User, related_name="creator", on_delete=models.CASCADE)
    to = models.ForeignKey(user_models.User, related_name="to", on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image, null=True, blank=True, on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
