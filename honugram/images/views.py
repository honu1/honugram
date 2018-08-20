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

class Feed(APIView):
    def get(self, request, format=None):

        user = request.user

        following_users = user.following.all()
        followers_users = user.followers.all()

        print(following_users)
        print(followers_users)

        image_list = []

        for following_user in following_users:

            user_image = following_user.images.all()[:2]

            for image in user_image:
                image_list.append(image)
        
        sorted_image = sorted(image_list, key=lambda image: image.created_at , reverse=True)
        print(sorted_image)

        serializer = serializers.ImageSerializer(sorted_image, many=True)

        return Response(serializer.data)

    class Meta():
        ordering = ['-created_at']

def get_key(image):
    return image.created_at

feed_view = Feed.as_view()    