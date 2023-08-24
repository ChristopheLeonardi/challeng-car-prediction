from .models import DummyData
from .models import Cars

def query_mongodb(query):
    data_instances = Cars.objects.filter(marqueModele=query)
    data_as_list = [data_instance.to_dict() for data_instance in data_instances]

    return data_as_list

def query_all_brands():
    data_instances = Cars.objects.values_list('marqueModele', flat=True).distinct()
    #data_as_list = [data_instance.to_dict() for data_instance in data_instances]

    return data_instances