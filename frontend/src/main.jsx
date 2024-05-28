import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { FinanceProvider } from './context/FinanceContext.jsx';


// axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = "https://finance-tracker-backend-azure.vercel.app/api/v1";
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <FinanceProvider>
      <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <App />
        </BrowserRouter>
    </FinanceProvider>

</AuthProvider>
)
