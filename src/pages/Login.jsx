import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";



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
  const [datos, setDatos] = useState(datosInitialState)
  //Estado para almacenar los usuarios registrados.
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
  const [error, setError] = useState(null)
  //Estado para almacenar si se está registrando o no
  const [esregistro, setEsregistro] = useState(false)
  //Se ejecuta cuando se envía el formulario
  const procesarDatos = (e) => {
    e.preventDefault()
    console.log("Procesando los datos...")
    const { email, pass, confpass, fecha, name, privacidad } = datos

    if (!email.trim()) {
      setError('Escribe un email')
      return
    }

    if (!pass.trim()) {
      setError('Escribe una password')
      return
    }
    if (pass.length < 6) {
      setError('Escribe una contraseña de 6 o mas carácteres')
      return
    }

    if (esregistro) {
      registrar()
    } else {
      login(email, pass, name )
    }
  }


  const registrar = async () => {  
    console.log('Registrando...')
    const { email, pass, confpass, fecha, name, privacidad } = datos
    //VALIDACIÓN DE REGISTRO
    if (!confpass.trim()) {
      setError('Repite la contraseña')
      return
    }
    if (confpass!=pass) {
      setError('No coincide la confirmación de la contraseña')
      return
    }
    if (!name.trim()) {
      setError('Escribe un nombre')
      return
    }
    if (!fecha.trim()) {
      setError('Escribe una fecha')
      return
    }
    if (!privacidad) {
      setError('Para registrarse debe aceptar la política de privacidad')
      return
    }
    //REGISTRAR EL USUARIO
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario registrado',
      icon: 'success',
    })
    console.log("Datos: " + JSON.stringify(datos))
    //Usuarios registrados
    setUsers(users.push(datos))
    console.log("Usuarios registrados: " + JSON.stringify(users))
    //LOCAL STORAGE USUARIOS REGISTRADOS
    window.localStorage.setItem("users", JSON.stringify(users));
    console.log("Local Storage Usuarios Registrados: "+ window.localStorage.getItem('users'))
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("fecha-nac", fecha);
    setDatos(datosInitialState)
    setError(null)
    setUser(true)
    navigate('/dashboard')
  }

  const login = async (email, pass, name ) => {
    //VALIDACION DEL USUARIO
    console.log("VALIDACIÓN LOGIN")
    console.log("Buscando entre los usuarios registrados...")
    var userRegistered = users.filter(user => user.email == email && user.pass == pass)[0]
    console.log("Resultado de la búsqueda: "+ JSON.stringify(userRegistered))
    console.log(userRegistered!=null)
    if(userRegistered!=null)
    {
      console.log('Iniciando sesión...')
          setUser(true)
          //LOCAL STORAGE USUARIO SESIÓN
          window.localStorage.setItem("name", userRegistered.name);
          window.localStorage.setItem("pass", pass);
          window.localStorage.setItem("fecha-nac", userRegistered.fecha);
          console.log("Nombre: "+ window.localStorage.getItem('name'))
          Swal.fire({
            title: 'Éxito',
            text: 'Has iniciado sesión',
            icon: 'success',
          })
          setDatos(datosInitialState)
          setError(null)
          navigate('/dashboard')
    }
    else
    {
      setError("La contraseña o el email no están registrados.")
      return
    }
    /*
    users.map((item, index) => {
      console.log(index + ".Email: " + item.email +" "+ item.pass)
      if(item.email == email){
        if (item.pass != pass){
          console.log("La contraseña no es correcta.")
          setError("La contraseña no es correcta")
          return
        }
        else{
          console.log('Logueando...')
          setUser(true)
          //LOCAL STORAGE USUARIO SESIÓN
          window.localStorage.setItem("name", name);
          window.localStorage.setItem("pass", pass);
          console.log("Nombre: "+ window.localStorage.getItem('name'))
          setDatos(datosInitialState)
          setError(null)
          navigate('/dashboard')
        }
      }  
      
    })
    setError("Este correo no está en uso.")
    return
     */
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
      

      {esregistro?
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

      {/*<h3 className='text-center'>{esregistro ? 'Registro' : 'Login'}</h3>
      <hr />*/}
          <form className="access__form" onSubmit={procesarDatos}>
            
            {error && <span className='alert'>{error}</span>}
            <label className="form__label">
            Correo Electrónico:
            <input
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
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login


/*import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
//import { UserContext } from '../contexts/UserContext';

const Login = () => {
 
  const datosInitialState = {
    email: "",
    pass: ""
  }

  const [user, setUser] = useContext(UserContext)
  const [datos, setDatos] = useState(datosInitialState)
  const [esregistro, setRegistro] = useState(false)
  const procesarDatos = () => {
    //validar datos
    if (esregistro) {
      registrar()
    } else {
      login()
    }
  }
  const registrar = () => {
    setUser(true)
    Navigate("/dashboard")
  }
  const login = () => {
    setUser(true)
    setDatos(datosInitialState)
    Navigate("/dashboard")
  }
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }
  <div>
    {
      esregistro ? "Registro" : "Login"
    }
    <form onSubmit={procesarDatos}>
      <input
        name='email'
        type="email"
        onChange={(e) => handleChange(e)}
        value={datos.email} />
      <input
        name='password'
        type="password"
        onChange={(e) => handleChange(e)}
        value={datos.pass} />
      <button
        type="submit">
        {
          esregistro ? "Registrarse" : "Login"
        }
      </button>
      <button
        onClick={() => setRegistro(!esregistro)}
        type="button">
        {
          esregistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"
        }
      </button>
    </form>
  </div>

}

export default Login*/
