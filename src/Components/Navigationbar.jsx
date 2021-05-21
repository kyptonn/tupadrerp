import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Navigationbar.css'
import firebase from '../firebase'


export default function Navigationbar() {

  const user = firebase.auth().currentUser;

  const [logeado, setLogeado] = useState()
  const [panel, setPanel] = useState("no-logeado")
  const [toggler, setToggler] = useState('toggler-closed')



  useEffect(() => { 
    if(user){
      setLogeado("logeado")
      setPanel("panel")
    }
  })



    return (
      <div className="contenedor-general-navigationbar">
      <div className={toggler}>

        <div onClick={() => setToggler('toggler-closed animate__animated animate__fadeOutUp')} className="cruz-cerrar">
          <i class="far fa-times-circle"></i>
        </div>

        <Link to="/"><ul className="primer-elemento-toggler">Inicio</ul></Link>
        <Link to="/"><ul>Normas</ul></Link>
        <Link to="/panel/donaciones"><ul>Donaciones</ul></Link>
        <Link to="/contacto"><ul>Contacto</ul></Link>
        <div className={logeado}>
        <Link to="/login"><ul>Inicio Sesión</ul></Link>
        </div>

        <div className={panel}>
        <Link to="/panel"><ul>Panel</ul></Link>
        </div>

      </div>


        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <Link to="/"><a class="navbar-brand" href="#">Tu Padre RP</a></Link>

            

            <button class="navbar-toggler" onClick={() => setToggler('toggler-open animate__animated animate__slideInDown')} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">

                <li class="nav-item">
                <Link to="/"><a class="nav-link active" aria-current="page" href="#">Inicio</a></Link>
                </li>

                <li class="nav-item">
                 <a class="nav-link" href="https://discord.gg/XJYcnCqBMR" target="_blank">Normas</a>
                </li>

                <li class="nav-item">
                  <Link to="/panel/donaciones"><a class="nav-link" href="#">Donaciones</a></Link>
                </li>

                <li class="nav-item">
                  <Link to="/contacto"><a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Contacto</a></Link>
                </li>

                <div className={logeado}>
                  <li class="nav-item">
                    <Link to="/login"><a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Iniciar Sesión</a></Link>
                  </li>
                </div>

                <div className={panel}>
                  <li class="nav-item">
                    <Link to="/panel/perfil"><a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Panel</a></Link>
                  </li>
                </div>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}
