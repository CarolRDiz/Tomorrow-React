import React from 'react'
//RUTAS ANIDADAS
import { Outlet } from "react-router-dom";
import Header from "../components/Header"

const LayoutPublic = () => {
    return (
            <div className="theme">
               <Header />
                <Outlet />
            </div>
            
    );
};
export default LayoutPublic;