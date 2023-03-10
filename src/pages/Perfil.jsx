import React, { useState } from 'react'

const Perfil = () => {
  const [name, setName] = useState(window.localStorage.getItem("name"))
  const [fecha_nac, setFechaNac] = useState(window.localStorage.getItem("fecha-nac"))
  return (
    <main>
      <h1>Perfil</h1>
      <span>Nombre: { name }</span>
      <span>Fecha de Nacimiento: { fecha_nac }</span>
    </main>
  
  )
}

export default Perfil
