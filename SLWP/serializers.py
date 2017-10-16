from rest_framework import serializers
from foldingathome.models import *


# class ProjectSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Project
#         fields = ('number', 'complete')


# class RunSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Run
#         fields = ('project_number', 'number')


# class CloneSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Clone
#         fields = ('project_number', 'run_number', 'number')


# class AttributeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Attribute
#         fields = ('name',)

# class TimeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Time
#         fields = ('project_number', 'run_number', 'clone_number', 'number')

# class TimeAttributeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = TimeAttribute
#         fields = ('project_number', 'run_number', 'clone_number', 'time_number', 'attribute_name', 'value')
