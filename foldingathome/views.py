from django.shortcuts import render, redirect
from foldingathome.models import *
from SLWP.serializers import *
from rest_framework import viewsets, filters


def fah_information(request):
    return render(request, 'fah-information.html')


def redirect_to_fah_information():
    return redirect('/foldingathome/fah-information.html')


def fah_studies(request):
    return render(request, 'fah-studies.html')

def fah_studies_table(request):
    return render(request, 'fah-studies-table.html')

def fah_study(request):
    return render(request, 'fah-study.html')

def fah_completed(request):
    return render(request, 'fah-completed.html')


# def fah_incomplete(request):
#     projects = Project.objects.filter(complete=0)
#     return render(request, 'fah-incomplete.html', {'projects': projects})


# class ProjectViewSet(viewsets.ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('number', 'complete')


# class RunViewSet(viewsets.ModelViewSet):
#     queryset = Run.objects.all()
#     serializer_class = RunSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('project_number', 'number')


# class CloneViewSet(viewsets.ModelViewSet):
#     queryset = Clone.objects.all()
#     serializer_class = CloneSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('project_number', 'run_number', 'number')


# class TimeViewSet(viewsets.ModelViewSet):
#     queryset = Time.objects.all()
#     serializer_class = TimeSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('project_number', 'run_number', 'clone_number', 'number')


# class AttributeViewSet(viewsets.ModelViewSet):
#     queryset = Attribute.objects.all()
#     serializer_class = AttributeSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('name',)


# class TimeAttributeViewSet(viewsets.ModelViewSet):
#     queryset = TimeAttribute.objects.all()
#     serializer_class = TimeAttributeSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('project_number', 'run_number',
#                      'clone_number', 'time_number', 'attribute_name')
