import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {useRef} from 'react';
import validator from 'validator'


const Contacto = () => {
  const datosInitialState = {
    asunto: '',
    email: '',
    message: '',
  }
  const [datos, setDatos] = useState(datosInitialState)
  const [error, setError] = useState(null)
  const [ isAlertVisible, setIsAlertVisible ] = useState(false)
  const inputRefEmail = useRef(null);
  const inputRefAsunto = useRef(null);
  const inputRefMessage = useRef(null);

  const procesarDatos = (e) => {
    e.preventDefault()
    const { asunto, email, message } = datos
    if (!asunto.trim()) {
          setError('Escribe un asunto.')
          inputRefAsunto.current.focus();
          handleButtonClick()
          return
        }
    if (!email.trim()) {
      setError('Escribe un email')
      inputRefEmail.current.focus();
      handleButtonClick()
      return
    }
    if (!validator.isEmail(email)) {
      setError('El email no es válido ')
      inputRefEmail.current.focus();
      handleButtonClick()
      return
    }
    if (!message.trim()) {
      setError('Escribe un mensaje')
      inputRefMessage.current.focus();
      handleButtonClick()
      return
    }
    enviar()
  }

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    })
  }

  const enviar =  ( ) => { 
    Swal.fire({
      title: 'Éxito',
      text: 'Mensaje enviado con éxito a '.concat(datos.email),
      icon: 'success',
    })
    setDatos(datosInitialState)
  }

  const handleButtonClick = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
        setIsAlertVisible(false);
    }, 4000);
}

  return (
    <main className="main__access">
        <section className="access__section">
            <div className="access__form-container">
                <form className="access__form" onSubmit={procesarDatos}>
                    <label className="form__label">
                        Asunto:
                        <input
                          ref={inputRefAsunto}
                          name="asunto"
                          className="form__input"
                          type="text" 
                          placeholder="Introduce un asunto"
                          onChange={(e) => handleChange(e)}
                          value={datos.asunto}/>
                    </label>
                    <label className="form__label">
                        Correo Electrónico:
                        <input 
                          ref={inputRefEmail}
                          name="email"
                          className="form__input"
                          type="text" 
                          placeholder="Introduce tu correo electrónico"
                          onChange={(e) => handleChange(e)}
                          value={datos.email}/>
                    </label>
                    <label className="form__label">
                        Mensaje:
                        <textarea
                          ref={inputRefMessage}
                          name="message"
                          className="form__input form__textarea"
                          onChange={(e) => handleChange(e)}
                          value={datos.message}
                          />
                    </label>
                    <button className="form__submit" type="submit">Enviar</button>
                    { isAlertVisible && 
                      <span className='alert'>{error}</span>
                      }
                </form>
            </div>
        </section>
        
    </main>
  )
}

export default Contacto
