import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Logo from "../assets/img/logo.png"
import Tomorrow from "../assets/img/Tomorrow.png"
import IconoUsuario from "../assets/img/icono_usuario.svg"
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext)
  return (
    <header className="header">
      <Link className="logo__link" to="/">
        <img className="logo__img" src={Logo} alt="Logo" />
        <img className="logo__name" src={Tomorrow} alt="Nombre_web" />
      </Link>
      <Navbar />
      <div className="header__right">
        
        {
          user ? (
            <Link className="header__user" to="/perfil">
            <img className="user__img" src={IconoUsuario} alt="icono_usuario" />
            </Link>
          ):
          (
            <Link className="header__user" to="/login">
            <img className="user__img" src={IconoUsuario} alt="icono_usuario" />
            </Link>
          )
        }
          
          
        
      </div>
    </header>
  )
}

export default Header
