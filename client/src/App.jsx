import React from 'react'

import './App.css'
import Login_Page from './features/auth/pages/login/Login.jsx';
import Home from './features/home/Home.jsx';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const Router = createBrowserRouter([
    { path: "/", element: <Login_Page /> },
    { path: "/home", element: <Home /> },
  ])
  return (
    <React.Fragment>
      <RouterProvider router={Router} />
    </React.Fragment>
  )
}

export default App
