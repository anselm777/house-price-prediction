from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

model = joblib.load("house_price_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    features = [
        float(data['bedrooms']),
        float(data['bathrooms']),
        float(data['sqft_living']),
        float(data['floors']),
        float(data['waterfront']),
        float(data['view']),
        float(data['condition']),
        float(data['grade']),
        float(data['sqft_above']),
        float(data['sqft_basement']),
        float(data['yr_built'])
    ]

    prediction = model.predict([features])

    return jsonify({'price': prediction[0]})


import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)