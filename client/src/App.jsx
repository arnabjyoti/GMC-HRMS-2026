import React from 'react'

import './App.css'
import Login_Page from './pages/login/Login';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const Router = createBrowserRouter([
    { path: "/", element: <Login_Page /> },
  ])
  return (
    <React.Fragment>
      <RouterProvider router={Router} />
    </React.Fragment>
  )
}

export default App
