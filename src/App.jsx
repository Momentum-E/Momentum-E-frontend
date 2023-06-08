import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useState } from 'react';

import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route path="dashboard" element={<Dashboard/>} />
    </>
  )
)

function App({routes}) {

  const initialState = {
    isSignedIn: false,
    user: {
      name: '',
      email: '',
    }
  };

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
