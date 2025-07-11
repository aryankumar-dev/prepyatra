import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Registration from './components/Auth/Registration.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<App />} />
        <Route path="/registration" element={<Registration />} />
         </Routes>
    </BrowserRouter>
  </StrictMode>,
)
