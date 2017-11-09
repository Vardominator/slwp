from django.conf.urls import url, include
from rest_framework import routers
from foldingathome import views as foldingathome_views

router = routers.DefaultRouter()

# RETURNS PROJECT QUERY SET FROM VIEWS
router.register(r'^projectList', foldingathome_views.ProjectListViewSet)
router.register(r'^BCHE', foldingathome_views.BcheViewSet)
router.register(r'^BCHE_project_summary', foldingathome_views.BcheProjectSummaryViewSet)
router.register(r'^BCHE_project_run_summary', foldingathome_views.BcheProjectRunSummaryViewSet, base_name='BCHE_project_run_summary')

urlpatterns = [
    url(r'^$', foldingathome_views.fah_information),
    url(r'^fah-information.html', foldingathome_views.fah_information),
    url(r'^index.html$', foldingathome_views.redirect_to_fah_information),
    url(r'^fah-completed.html', foldingathome_views.fah_completed),
    url(r'^fah-studies.html', foldingathome_views.fah_studies),
    url(r'^fah-studies-table.html', foldingathome_views.fah_studies_table),
    url(r'^fah-study.html', foldingathome_views.fah_study),
    url(r'^api/', include(router.urls))
]
