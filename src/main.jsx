import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/index.css'
import { ThemeProvider } from "@material-tailwind/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../src/App'
import Page_view_home from '../src/pages/homePage/home_page'
import ErrorPage from './components/errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage />
  },
  {
    path: 'api/documentos',
    element: <Page_view_home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "api/documentos/1",
        element: <div><p>golas</p></div>
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
