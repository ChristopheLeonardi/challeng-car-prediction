from django.http import HttpResponse
from django.http import JsonResponse
import json
from .MLP_prediction import MLP_prediction
from .query_mongodb import query_all_brands, get_model_description


def predict_price(request):
    query = request.GET.get("q", "")
    data_dict = json.loads(query)
    print(data_dict)
    data_predicted = MLP_prediction(data_dict)
    return JsonResponse(data_predicted)

def get_data(request):
    data = query_all_brands()
    return JsonResponse(data, safe=False)

def get_description(request):
    query = request.GET.get("q", "")
    data = get_model_description(query)
    return JsonResponse(data, safe=False)
