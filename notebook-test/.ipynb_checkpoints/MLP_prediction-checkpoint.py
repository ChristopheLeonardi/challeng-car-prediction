import pickle
import pandas as pd 
import numpy as np
from sklearn.preprocessing import MinMaxScaler 
from sklearn.neural_network import MLPRegressor


# Load Model
loaded_model = pickle.load(open('regressor_model.sav', 'rb'))

# Load dummy data
X = pd.read_json("sample.json")

# test prediction
scaler = MinMaxScaler()
scaler.fit(X)
X_test = scaler.transform(X)
y_predict = loaded_model.predict(X_test)
y_predict = pd.DataFrame(y_predict, columns = ['Prédiction'])

print(y_predict)