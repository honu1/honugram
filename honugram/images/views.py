from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

# viewing all image in database.
# this practic test. service dev is not adjust to it.

class ListAllImages(APIView):

    def get(self, request, format=None):

        print(request.scheme)
        print(request.body)

        all_images =  models.Image.objects.all()

        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)

list_all_images_view = ListAllImages.as_view()

class ListAllComments(APIView):

    def get(self, request, format=None):

        all_comments =  models.Comment.objects.all()

        serializer = serializers.CommentSerializer(all_comments, many=True)

        return Response(data=serializer.data)

list_all_comments_view = ListAllComments.as_view()


class ListAllLikes(APIView):

    def get(self, request, format=None):

        all_likes =  models.Like.objects.all()

        print(request.user.website)

        serializer = serializers.LikeSerializer(all_likes, many=True)

        return Response(data=serializer.data)

list_all_likes_view = ListAllLikes.as_view()