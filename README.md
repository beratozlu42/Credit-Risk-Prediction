# 🏦 Credit Risk Assessment Tool

A high-performance Machine Learning application designed to predict personal credit default risks with high accuracy. This project features a robust Flask backend serving a trained ML model and a sleek, modern React dashboard for interactive analysis.

## 🚀 Key Features

- **ML-Powered Predictions**: Real-time credit risk assessment using a Scikit-Learn model trained on historical lending data.
- **Statistical Dashboard**: Visualize platform-wide metrics including average income, default distribution, and historical stability.
- **Modern UI/UX**: A premium dark-mode interface built with **React 19**, **Tailwind CSS**, and **Shadcn UI**.
- **Interactive Forms**: User-friendly input system with real-time validation and localized data processing.
- **Probabilistic Scoring**: Provides not just a "Yes/No" but a detailed risk probability percentage.

## 🛠️ Technology Stack

### Backend
- **Python / Flask**: Restful API for serving model inferences.
- **Scikit-Learn**: Machine learning framework for model development and prediction.
- **Pandas & NumPy**: Data manipulation and feature engineering.
- **Joblib**: Efficient model serialization and loading.

### Frontend
- **React 19 & Vite**: Ultra-fast development and optimized production builds.
- **TypeScript**: Type-safe development for component stability.
- **Tailwind CSS 4**: Utility-first styling with modern design tokens.
- **Shadcn UI & Lucide**: Premium component library and iconography.
- **React Router**: Seamless SPAs (Single Page Applications) navigation.

## 📂 Project Structure

```text
├── backend/                # Flask API & ML Models
│   ├── app.py             # Main API entry point
│   └── model/             # Trained models, scalers, and datasets
├── frontend/               # React + TypeScript App
│   ├── src/
│   │   ├── pages/         # Application pages (Home, CreditRisk, Stats)
│   │   ├── components/    # Reusable UI components (Shadcn)
│   │   └── services/      # API integration layers
│   └── package.json
└── assets/                 # Project documentation assets
```

## ⚙️ Setup & Installation

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install flask flask-cors joblib pandas numpy scikit-learn
   ```
4. Start the API:
   ```bash
   python app.py
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 How It Works

The application takes various user data points (Age, Income, Loan Amount, etc.) and processes them through an ML pipeline:
1. **Data Normalization**: Input is scaled using the same `scaler.pkl` used during training.
2. **Feature Alignment**: Categorical variables (Home Ownership, Loan Intent) are encoded to match the model's feature names.
3. **Inference**: The model calculates the probability of default based on complex historical patterns.
4. **JSON Response**: The API returns a clear risk status and a precise probability float.

---

*This project was developed to showcase the integration of Machine Learning with modern web technologies.*
