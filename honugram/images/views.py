from rest_framework.view import APIView
from rest_framework.response import Response
from . import models, serializers

# viewing all image in database.
# this practic test. service dev is not adjust to it.

class ListAllImages(APIView):

    def get(self, request, format=None):

        all_images =  models.Image.objects.all()

        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)