from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("model/credit_model.pkl")
scaler = joblib.load("model/scaler.pkl")
feature_names = joblib.load("model/feature_names.pkl")

@app.route("/")
def home():
    return "Credit Risk API is running"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    input_df = pd.DataFrame([data])
    numeric_cols = [
        "person_age", "person_income", "person_emp_length",
        "loan_amnt", "loan_int_rate", "loan_percent_income",
        "cb_person_cred_hist_length"
    ]
    for col in numeric_cols:
        input_df[col] = pd.to_numeric(input_df[col], errors='coerce')

    cat_cols = ["person_home_ownership", "loan_intent", "cb_person_default_on_file"]
    for col in cat_cols:
        if col in input_df.columns:
            input_df[col] = input_df[col].str.upper()
    input_df = pd.get_dummies(input_df)

    for col in feature_names:
        if col not in input_df:
            input_df[col] = 0
    input_df = input_df[feature_names]
    
    input_scaled = scaler.transform(input_df)
    prediction = model.predict(input_scaled)[0]
    probability = model.predict_proba(input_scaled)[0][1]

    return jsonify({
        "prediction": int(prediction),
        "risk_probability": float(round(probability * 100, 2))
    })
    
@app.route("/stats")
def stats():
    df = pd.read_csv("model/credit_risk_dataset.csv")
    
    return jsonify({
        "avg_income": df["person_income"].mean(),
        "risk_distribution": df["loan_status"].value_counts().to_dict()
    })

if __name__ == "__main__":
    app.run(debug=True)