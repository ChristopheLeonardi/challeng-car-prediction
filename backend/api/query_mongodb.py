from .models import DummyData
from .models import Cars

def query_mongodb(query):
    data_instances = Cars.objects.filter(marqueModele=query)
    data_as_list = [data_instance.to_dict() for data_instance in data_instances]
    return data_as_list

def query_all_brands():
    data_instances = Cars.objects.values_list('marqueModele',
 flat=True).distinct()
    data_instances_list = list(data_instances)
    return data_instances_list

def get_model_description(query):
    data_instances = Cars.objects.filter(marqueModele=query)
    data = [data_instance.to_dict() for data_instance in data_instances][0]
    response = {
        "modele": query,
        "origin": data["origin"],
        "year": data["year"],
        "doors": data["doors"],
        "ratedHorsePower": data["ratedHorsePower"],
        "powerDIN": data["powerDIN"],
        "critAir": data["critAir"],
        "co2": data["co2"]
    }
    return response
