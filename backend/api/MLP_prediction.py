import pickle
import pandas as pd 
import numpy as np
from django.templatetags.static import static
from sklearn.preprocessing import MinMaxScaler 
from sklearn.neural_network import MLPRegressor
import os

""" 
data_dict = (Prix year origin firstHand mileage energy gearbox doors ratedHorsePower powerDIN critAir co2 owners) 
"""
def MLP_prediction(data_dict):

    # Load Model
    model_url = "." + static('regressor_model.sav')
    loaded_model = pickle.load(open(model_url, 'rb'))

    X = pd.DataFrame(data_dict)

    # Prediction
    scaler = MinMaxScaler()
    scaler.fit(X)
    X_test = scaler.transform(X)
    y_predict = loaded_model.predict(X_test)

    response = {
        "data": data_dict,
        "prediction_price" : y_predict[0]
    }   
    return response