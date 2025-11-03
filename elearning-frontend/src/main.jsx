import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useAuthStore } from "./store/useAuthStore.js"
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import './output.css'
useAuthStore.getState().load();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
