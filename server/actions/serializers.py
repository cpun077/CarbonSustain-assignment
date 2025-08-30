from rest_framework import serializers
from .models import Action

class ActionSerializer(serializers.ModelSerializer): # allow data to be in JSON
    class Meta:
        model = Action
        fields = ['id', 'action', 'date', 'points']