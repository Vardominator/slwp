from django.shortcuts import render, redirect
from foldingathome.models import ProjectList, Bche
from SLWP.serializers import ProjectListSerializer, BcheSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


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


class ProjectListViewSet(viewsets.ModelViewSet):
    queryset = ProjectList.objects.all()
    serializer_class = ProjectListSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = (
        'projNum',
        'projType',
        'dbServer',
        'server',
        'numRun',
        'numClone',
        'numAtoms',
        'description'
    )


class BcheViewSet(viewsets.ModelViewSet):
    queryset = Bche.objects.all()
    serializer_class = BcheSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = (
        'proj',
        'run',
        'clone',
        'frame',
        'rmsd_pro',
        'rmsd_complex',
        'mindist',
        'rg_pro',
        'E_vdw',
        'E_qq',
        'dssp',
        'Nhelix',
        'Nbeta',
        'Ncoil',
        'dateacquried',
        'timeacquired'
    )
