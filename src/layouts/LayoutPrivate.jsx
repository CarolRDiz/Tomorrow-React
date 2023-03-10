import React from 'react'
//RUTAS ANIDADAS
import { Outlet } from "react-router-dom";
import Header from "../components/Header"

const LayoutPrivate = () => {
    return (
            <div className="theme">
                <Outlet />
            </div>
            
    );
};
export default LayoutPrivate;

/*import React, { useEffect } from 'react'
//RUTAS ANIDADAS
import { useNavigate, Outlet } from "react-router-dom";
const LayoutPrivate = () => {
    const navigate = useNavigate()

  const [user, setUser] = useContext(UserContext)
    useEffect(()=>{
        if(!user){
            navigate("/login")
        } 
    },{user})
    
    return (
        <Outlet />
    );
    
};

export default LayoutPrivate;*/
