import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register/>
  },
  {
    path: '/',
    element: <Home/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
