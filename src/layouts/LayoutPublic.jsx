import React from 'react'
//RUTAS ANIDADAS
import { Outlet } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"

const LayoutPublic = () => {
    return (
            <div className="theme">
               <Header />
                {/*
                <main className="container">
                    <Outlet />
                </main>
                */}
                <Outlet />
                <Footer />
            </div>
            
    );
};
export default LayoutPublic;