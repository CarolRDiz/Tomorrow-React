import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import { useRef } from 'react';



const Login = () => {
  const navigate = useNavigate()
  // setUser - UserContext
  const { user, setUser } = useContext(UserContext)

  //Generamos el estado para almacenar el usuario que se introduce en el formulario.
  const datosInitialState = {
    email: '',
    pass: '',
    confpass: '',
    fecha: '',
    name: '',
    privacidad: '',
  }
  const inputRefEmail = useRef(null);
  const inputRefPass = useRef(null);
  const inputRefRepeatPass = useRef(null);
  const inputRefName = useRef(null);
  const inputRefDate = useRef(null);
  const inputRefPrivacity = useRef(null);

  const [datos, setDatos] = useState(datosInitialState)
  //Estado para almacenar los usuarios registrados.
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
  const [error, setError] = useState(null)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  //Estado para almacenar si se está registrando o no
  const [esregistro, setEsregistro] = useState(false)
  //Se ejecuta cuando se envía el formulario
  const procesarDatos = (e) => {
    e.preventDefault()
    const { email, pass, confpass, fecha, name, privacidad } = datos

    if (!email.trim()) {
      setError('Escribe un email')
      inputRefEmail.current.focus();
      handleAlert()
      return
    }

    if (!pass.trim()) {
      setError('Escribe una password')
      inputRefPass.current.focus();
      handleAlert()
      return
    }
    if (pass.length < 6) {
      setError('Escribe una contraseña de 6 o mas carácteres')
      inputRefPass.current.focus();
      handleAlert()
      return
    }

    if (esregistro) {
      registrar()
    } else {
      login(email, pass, name)
    }
  }


  const registrar = async () => {
    const { email, pass, confpass, fecha, name, privacidad } = datos
    //VALIDACIÓN DE REGISTRO
    if (!confpass.trim()) {
      setError('Repite la contraseña')
      inputRefRepeatPass.current.focus();
      handleAlert()
      return
    }
    if (confpass != pass) {
      setError('No coincide la confirmación de la contraseña')
      inputRefRepeatPass.current.focus();
      handleAlert()
      return
    }
    if (!name.trim()) {
      setError('Escribe un nombre')
      inputRefName.current.focus();
      handleAlert()
      return
    }
    if (!fecha.trim()) {
      setError('Escribe una fecha')
      inputRefDate.current.focus();
      handleAlert()
      return
    }
    if (!privacidad) {
      setError('Para registrarse debe aceptar la política de privacidad')
      inputRefPrivacity.current.focus();
      handleAlert()
      return
    }
    //REGISTRAR EL USUARIO
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario registrado',
      icon: 'success',
    })
    //Usuarios registrados
    setUsers(users.push(datos))
    //LOCAL STORAGE USUARIOS REGISTRADOS
    window.localStorage.setItem("users", JSON.stringify(users));
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("fecha-nac", fecha);
    setDatos(datosInitialState)
    setError(null)
    setUser(true)
    navigate('/')
  }

  const login = async (email, pass, name) => {
    //VALIDACION DEL USUARIO
    var userRegistered = users.filter(user => user.email == email && user.pass == pass)[0]
    if (userRegistered != null) {
      setUser(true)

      //LOCAL STORAGE USUARIO SESIÓN
      window.localStorage.setItem("name", userRegistered.name);
      window.localStorage.setItem("pass", pass);
      window.localStorage.setItem("fecha-nac", userRegistered.fecha);
      Swal.fire({
        title: 'Éxito',
        text: 'Has iniciado sesión',
        icon: 'success',
      })
      setDatos(datosInitialState)
      setError(null)
      navigate('/')
    }
    else {
      setError("La contraseña o el email no están registrados.")
      handleAlert()
      return
    }
  }
  const handleAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000);
  }

  // Guarda los datos introducidos en datos
  const handleChange = (e) => {

    setDatos({
      ...datos,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })
  }


  return (
    <main className="main__access">
      <section className="access__section">
        <div className="access__form-container">


          {esregistro ?
            <ul className="selection__ul">
              <li className='selection__option'>
                <button
                  className='option__link'
                  onClick={() => setEsregistro(!esregistro)}
                  type='button'>
                  Iniciar sesión
                </button>
              </li>
              <li className='selection__option selection__option--active'>
                <span>Registrarse</span>
              </li>

            </ul>
            :
            <ul className="selection__ul">
              <li className='selection__option selection__option--active'>
                <span >Iniciar sesión</span>
              </li>
              <li className='selection__option '>
                <button
                  className='option__link'
                  onClick={() => setEsregistro(!esregistro)}
                  type='button'>
                  Registrarse
                </button>
              </li>
            </ul>}
          <form className="access__form" onSubmit={procesarDatos}>
            <label className="form__label">
              Correo Electrónico:
              <input
                ref={inputRefEmail}
                name='email'
                type='email'
                className='form__input'
                placeholder='Introduce el email'
                onChange={(e) => handleChange(e)}
                value={datos.email}
              />
            </label>
            <label className="form__label">
              Contraseña:
              <input
                name='pass'
                ref={inputRefRepeatPass}
                type='password'
                className='form__input'
                placeholder='Introduce el password'
                onChange={(e) => handleChange(e)}
                value={datos.pass}
              />
            </label>
            {esregistro &&
              <label className="form__label">
                Repetir contraseña:
                <input
                  ref={inputRefRepeatPass}
                  name='confpass'
                  type='password'
                  className='form__input'
                  placeholder='Introduce el password'
                  onChange={(e) => handleChange(e)}
                  value={datos.confpass}
                />
              </label>
            }
            {esregistro &&
              <label className="form__label">
                Nombre:
                <input
                  ref={inputRefName}
                  name='name'
                  type='text'
                  className='form__input'
                  placeholder='Introduce tu nombre'
                  onChange={(e) => handleChange(e)}
                  value={datos.name}
                />
              </label>
            }
            {esregistro &&
              <label className="form__label">
                Fecha de nacimiento:
                <input
                  ref={inputRefDate}
                  name='fecha'
                  type='date'
                  max={new Date().toJSON().split('T')[0]}
                  className='form__input'
                  onChange={(e) => handleChange(e)}
                  value={datos.fecha}
                />
              </label>
            }
            {
              esregistro &&
              <div className="form__checkbox">
                <input
                  ref={inputRefPrivacity}
                  name="privacidad"
                  className="checkbox__input"
                  type="checkbox"
                  onChange={(e) => handleChange(e)}
                  checked={datos.privacidad}
                />
                <label className="checkbox__label">Acepto la política de privacidad</label>
              </div>}
            {
              esregistro ||
              <p className="form__remember"><Link className="remember__link" to="/login">He olvidado mi contraseña</Link></p>
            }
            {
              esregistro ||
              <div className="form__checkbox">
                <input
                  ref={inputRefPrivacity}
                  className="checkbox__input"
                  type="checkbox"
                //onChange={(e) => handleChange(e)}
                />
                <label className="chackbox__label">Recordar mis datos</label>
              </div>
            }
            <button className='form__submit' type='submit'>
              {esregistro ? 'Registrar' : 'Login'}
            </button>
            {isAlertVisible &&
              <span className='alert'>{error}</span>
            }
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login