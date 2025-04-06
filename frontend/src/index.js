import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './loginPage/loginPage';
import HomePage from './homePage/homePage';
import DeviceDetails from './deviceDetailsPage/deviceDetailsPage';
import NotAdminErrorPage from './helperComponents/notAdminErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router=createBrowserRouter([
  {path:"/",element:<LoginPage/>},
  {path:"/home",element:<HomePage/>},
  {path:"/deviceDetails",element:<DeviceDetails/>},
  {path:"/errorPage",element:<NotAdminErrorPage/>},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>

);
