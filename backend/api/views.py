from django.http import HttpResponse
from django.http import JsonResponse

from .MLP_prediction import MLP_prediction


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def predict_price(request):

    # Load dummy data
    data_dict = [{
        'year': 2022,
        'origin': 1,
        'firstHand': 0,
        'mileage': 20,
        'energy': 0,
        'gearbox': 1,
        'doors': 4,
        'ratedHorsePower': 10,
        'powerDIN': 190,
        'critAir': 2,
        'co2': 132,
        'owners': 2.0
    }]
    
    #data_predicted.data_send, data_predicted.prediction_price
    data_predicted = MLP_prediction([])
    return HttpResponse(data_predicted.prediction_price)
