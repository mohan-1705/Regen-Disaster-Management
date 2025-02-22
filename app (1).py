import streamlit as st
import numpy as np
import tensorflow as tf
from tensorflow import keras
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load dataset (for feature scaling)
file_path = "C:/Users/defaultuser0/OneDrive/Desktop/Flood prediction/flood/flood.csv"
df = pd.read_csv(file_path)
X = df.drop(columns=["FloodProbability"])

# Standardize input features
scaler = StandardScaler()
scaler.fit(X)  # Fit on full dataset

# Explicitly define the loss function
custom_objects = {"mse": keras.losses.MeanSquaredError()}

# Load the trained model
model = keras.models.load_model("model.h5", custom_objects=custom_objects)

# Streamlit UI
st.title("Flood Probability Prediction")
st.write("Enter the input features below:")

# Create input fields for each feature
input_data = {}
for col in X.columns:
    input_data[col] = st.number_input(f"Enter {col}", value=0.0)

# Convert input to a NumPy array
input_array = np.array(list(input_data.values())).reshape(1, -1)

# Standardize input
input_array_scaled = scaler.transform(input_array)

# Predict Flood Probability
if st.button("Predict"):
    prediction = model.predict(input_array_scaled)[0][0]
    st.write(f"### Predicted Flood Probability: {prediction:.4f}")
