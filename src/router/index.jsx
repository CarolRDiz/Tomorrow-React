//ENRUTAMIENTO- RouterProvider
import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Busqueda from "../pages/Busqueda";
import Prediccion from "../pages/Prediccion";
import Contacto from "../pages/Contacto";
import Perfil from "../pages/Perfil";
import NotFound from '../pages/NotFound'
import LayoutPublic from '../layouts/LayoutPublic'
import LayoutPrivate from '../layouts/LayoutPrivate'
import Dashboard from "../pages/Dashboard"
//
//RUTAS ANIDADAS
export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        errorElement: <NotFound />,
        children: [
        // son children, heredan el LayoutPublic
            {
                index: true,
                element: <Busqueda />,
            },
            /*
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/blog",
                element: <Blog />,
            },*/
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/registro",
                element: <Registro />,
            },
            {
                path: "/prediccion/:communityName/:provinceName",
                element: <Prediccion />,
            },
            {
                path: "/contacto",
                element: <Contacto />,
            },
            {
                path: "/perfil",
                element: <Perfil />,
            },
            {
                path: "/dashboard",
                //element: <LayoutPrivate />,
                element: <LayoutPrivate/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>
                    }
                ]
            },
        ],
    },
]);
