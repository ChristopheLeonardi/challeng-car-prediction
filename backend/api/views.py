from django.http import HttpResponse
from django.http import JsonResponse
import json
from .MLP_prediction import MLP_prediction


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

"""
dummy data argument url 
q=[{"year":2022,"origin":1,"firstHand":0,"mileage":20,"energy":0,"gearbox":1,"doors":4,"ratedHorsePower":10,"powerDIN":190,"critAir":2,"co2":132,"owners":2.0}]
"""

def predict_price(request):
    query = request.GET.get("q", "")
    data_dict = json.loads(query)
    data_predicted = MLP_prediction(data_dict)

    return JsonResponse(data_predicted)
