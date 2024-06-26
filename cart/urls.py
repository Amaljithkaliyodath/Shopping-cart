from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.add_item, name='add_item'),
    path('update/', views.update_item, name='update_item'),
    path('remove/', views.remove_item, name='remove_item'),
    path('checkout/', views.checkout, name='checkout'),
]
