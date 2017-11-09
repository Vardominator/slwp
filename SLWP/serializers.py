from rest_framework import serializers
from foldingathome.models import ProjectList, Bche, BcheProjectSummary


class ProjectListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectList
        fields = (
            'projNum',
            'projType',
            'dbServer',
            'server',
            'numRun',
            'numClone',
            'numAtoms',
            'description'
        )


class BcheSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bche
        fields = (
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


class BcheProjectSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = BcheProjectSummary
        fields = (
            'Proj',
            'Description',
            'NumberOfRuns',
            'NumberOfClones',
            'AverageRMSDPro',
            'StdDevRMSDPro',
            'AverageRMSDComplex',
            'StdDevRMSDComplex',
            'RGPro',
            'StdDevRGPro'
        )


class BcheProjectRunSummarySerializer(serializers.Serializer):
    Run = serializers.IntegerField()
    AverageRMSDPro = serializers.DecimalField(max_digits=20, decimal_places=2)
    StdDevRMSDPro = serializers.DecimalField(max_digits=20, decimal_places=2)
    AverageRMSDComplex = serializers.DecimalField(max_digits=20, decimal_places=2)
    StdDevRMSDComplex = serializers.DecimalField(max_digits=20, decimal_places=2)
    RGPro = serializers.DecimalField(max_digits=20, decimal_places=2)
    StdDevRGPro = serializers.DecimalField(max_digits=20, decimal_places=2)
