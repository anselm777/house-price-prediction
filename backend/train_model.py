import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error
import joblib

print("🚀 Starting model training...")

# Load dataset
df = pd.read_csv("kc_house_data.csv")

print("✅ Dataset loaded")

# Drop unnecessary columns
df = df.drop(['id', 'date'], axis=1)

# Drop missing values
df = df.dropna()

# Features
features = [
    'bedrooms',
    'bathrooms',
    'sqft_living',
    'floors',
    'waterfront',
    'view',
    'condition',
    'grade',
    'sqft_above',
    'sqft_basement',
    'yr_built'
]

X = df[features]
y = df['price']

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestRegressor(n_estimators=100, max_depth=12)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Metrics
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"📊 R2 Score: {r2}")
print(f"📉 RMSE: {rmse}")

# Save model
joblib.dump(model, "house_price_model.pkl")

print("✅ Model saved successfully!")