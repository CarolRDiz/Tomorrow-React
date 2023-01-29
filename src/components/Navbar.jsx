import React, { useContext } from 'react'
//import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    const cerrarSesion = () => {
        console.log('cerrando...')
        navigate('/login')
        setUser(null)
    }
    /*
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const cerrarSesion = () => {
        navigate("/login")
        setUser(null)
    }
    */
    return (
        <nav className="header__menu">
            <ul className="menu__list">
                <li className="menu__li">
                    <NavLink className="menu__link" to="/">
                        Inicio
                    </NavLink>
                </li>
                {
                    user || 
                    (
                    <li className="menu__li">
                        <NavLink className="menu__link" to="/login">
                            Login
                        </NavLink>
                    </li>
                    )
                }
                {/* 
                {
                    user || (
                        <li className="menu__li">
                            <NavLink className="menu__link" to="/registro">
                                Registro
                            </NavLink>
                        </li>)
                }
                {user && (
                    <li className="menu__li">
                        <NavLink className="menu__link" to="/perfil">
                            Perfil
                        </NavLink>
                    </li>
                )
                }
                {
                    user ? (
                        <button onClick={() => cerrarSesion()}>
                            Cerrar
                            
                        </button>
                    ) :
                        (
                            <li className="menu__li">
                                <NavLink className="menu__link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        )
                }
                */}
                <li className="menu__li">
                    <NavLink className="menu__link" to="/contacto">
                        Contacto
                    </NavLink>
                </li>
                
                
                <li className="menu__li">
                    <NavLink className="menu__link" to="/busqueda">
                        Búsqueda
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;