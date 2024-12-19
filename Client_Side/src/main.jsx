import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Router/Routes.jsx'
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Provider/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

    <ToastContainer />
   <RouterProvider router={routes}/>
    </AuthProvider>
  </StrictMode>,
)
