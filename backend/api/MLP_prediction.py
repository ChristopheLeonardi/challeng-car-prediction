import pickle
import pandas as pd 
import numpy as np
import joblib
from django.templatetags.static import static
from sklearn.preprocessing import OneHotEncoder, StandardScaler, MinMaxScaler 
from sklearn.neural_network import MLPRegressor
import os

def MLP_prediction(data_dict_list):

    model_url = "." + static('rf_model.joblib')
    loaded_model = joblib.load(model_url)

    scaler_url = "." + static('scalermm.joblib')
    loaded_scaler = joblib.load(scaler_url)

    data_dict = data_dict_list[0]
    input_values = [data_dict['year'], data_dict['origin'], data_dict['firstHand'],
                    data_dict['mileage'], data_dict['energy'], data_dict['gearbox'],
                    data_dict['doors'], data_dict['ratedHorsePower'], data_dict['powerDIN'],
                    data_dict['critAir'], data_dict['co2'], data_dict['owners']]

    # Convert the values to float
    input_data = np.array(input_values, dtype=float) 
    input_data = input_data.reshape(1, -1)
    
    # Transform the input data using the loaded scaler
    scaled_input_data = loaded_scaler.transform(input_data)
    print(scaled_input_data)
    y_predict = loaded_model.predict(scaled_input_data)

    response = {
        "data": data_dict,
        "prediction_price" : y_predict[0]
    }   
    return response