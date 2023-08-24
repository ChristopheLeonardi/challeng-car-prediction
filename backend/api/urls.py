from django.urls import path

from . import views

urlpatterns = [
    path("predict_price", views.predict_price, name="predict_price"),
    path("get_data", views.get_data, name="get_data"),
]

