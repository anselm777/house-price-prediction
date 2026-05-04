import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    bedrooms: '',
    bathrooms: '',
    sqft_living: '',
    floors: '',
    waterfront: '0',
    view: '0',
    condition: '3',
    grade: '',
    sqft_above: '',
    sqft_basement: '',
    yr_built: ''
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const predictPrice = async () => {
    const values = Object.values(form);

if (values.some(v => v === "")) {
  alert("⚠️ Please fill all fields");
  return;
}
    setLoading(true);
    setPrice(null);

    try {
      const response = await axios.post('/predict', form);
      setPrice(response.data.price);
    } catch (error) {
      alert("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏠 House Price Predictor</h2>

        <div style={styles.grid}>

          {/* Numeric Inputs */}
          {['bedrooms','bathrooms','sqft_living','floors','grade','sqft_above','sqft_basement','yr_built'].map((key) => (
            <div key={key} style={styles.inputBox}>
              <label style={styles.label}>{key.replace('_', ' ')}</label>
              <input
                type="number"
                name={key}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          ))}

          {/* Dropdowns */}
          <div style={styles.inputBox}>
            <label style={styles.label}>Waterfront</label>
            <select name="waterfront" onChange={handleChange} style={styles.input}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>View</label>
            <select name="view" onChange={handleChange} style={styles.input}>
              {[0,1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Condition</label>
            <select name="condition" onChange={handleChange} style={styles.input}>
              {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

        </div>

        <button 
          style={styles.button} 
          onClick={predictPrice}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {/* Loader */}
        {loading && <div style={styles.loader}></div>}

        {/* Result */}
        {price && (
          <div style={styles.result}>
            💰 Estimated Price: ₹ {Number(price).toLocaleString('en-IN')}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },

  card: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "15px",
    width: "650px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "22px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },

  inputBox: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    fontSize: "12px",
    marginBottom: "4px",
    color: "#e0e0e0"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.9)"
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  result: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#00ffcc"
  },

  loader: {
    margin: "20px auto",
    border: "4px solid rgba(255,255,255,0.3)",
    borderTop: "4px solid #00c6ff",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite"
  }
};

export default App;