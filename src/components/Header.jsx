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
        <div className="header__search">
          <input type="search" className="search__input" placeholder="Buscar..." />
          <svg className="search__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" /></g></svg>
        </div>
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
