# actions/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get, post, put, delete, getall
from .serializers import ActionSerializer
from django.http import HttpResponse
import json

class DownloadView(APIView): # download json endpoint
    def get(self, request):
        try:
            action_obj = getall()
            serializer = ActionSerializer(action_obj, many=True)
            response = HttpResponse(
                json.dumps(serializer.data, indent=4),
                content_type="application/json"
            ) # send in string form
            response['Content-Disposition'] = 'attachment; filename="actions.json"' # download for user
            return response
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_404_NOT_FOUND)

class ListView(APIView): # calls functions that use the general endpoint
    def post(self, request):
        serializer = ActionSerializer(data=request.data)
        if serializer.is_valid():
            new_action = post(
                action=serializer.validated_data["action"],
                date=serializer.validated_data["date"],
                points=serializer.validated_data["points"]
            )
            response_serializer = ActionSerializer(new_action)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        try:
            action_obj = getall()
            serializer = ActionSerializer(action_obj, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        

class DetailView(APIView): # calls functions that use a specific id endpoint
    def get(self, request, id):
        try:
            action_obj = get(id)
            serializer = ActionSerializer(action_obj)
            return Response(serializer.data)
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            action_obj = get(id)
            serializer = ActionSerializer(action_obj, data=request.data, partial=True)
            if serializer.is_valid(): # edits will maintain format
                updated = put(id, **serializer.validated_data)
                response_serializer = ActionSerializer(updated)
                return Response(response_serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        if delete(id):
            return Response({"message": "Deleted"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"Error": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
