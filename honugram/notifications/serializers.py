from rest_framework import serializers
from . import models
from honugram.users import serializers as user_serializers
from honugram.images import serializers as image_serializers

class NotificationSerializer(serializers.ModelSerializer):

    creator = user_serializers.ListUserSerializer()
    image = image_serializers.SmallImageSerializer()

    class Meta:
        model = models.Notification
        fields ='__all__'