from rest_framework import serializers
from . import models

# class name은 아무거나 해도 됨 Meta의 model이 중요함.
class ImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Image
        fields ='__all__'

class CommentSerializer(serializers.ModelSerializer):
    
    image = ImageSerializer()
    
    class Meta:
        model = models.Comment
        fields ='__all__'

class LikeSerializer(serializers.ModelSerializer):
    
    image = ImageSerializer()

    class Meta:
        model = models.Like
        fields ='__all__'        