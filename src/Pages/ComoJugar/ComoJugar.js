import React from 'react'
import Navigationbar from '../../Components/Navigationbar'
import './ComoJugar.css'
import {Link} from 'react-router-dom'


export default function ComoJugar() {
    return (
        <div>

            <Navigationbar/>
            <div className="fondo-general-inicio">

            <div className="contenedor-general-como-jugar">
                <h1>Cómo Jugar</h1>
                <div className="pasos-jugar">

                    <div className="card-donaciones">
                        <h3>Compra e Instala GTA V</h3>
                        <br></br>
                        <h6>Puedes descargar comprar GTA V, haciendo clic <a href="https://www.instant-gaming.com/?igr=gamer-99273d">aquí</a></h6>
                    </div>


                    <div className="card-donaciones">
                        <h3>Únete a la comunidad</h3>
                        <br></br>
                        <h6>Debes registrate en nuestra página web. <br></br>Regístrate haciendo clic <Link to="/registro">aquí </Link></h6>
                    </div>

                    <div className="card-donaciones">
                        <h3>Descarga Five M</h3>
                        <br></br>
                        <h6>Puedes descargar FiveM, haciendo clic <a href="https://fivem.net/">aquí</a></h6>
                    </div>



                    
                </div>


                <br></br>
                <br></br>

                
                <div className="card-donaciones">
                        <h3>Disfruta del Server</h3>
                        <br></br>
                        <h6>Puedes descargar FiveM, haciendo clic <a href="https://fivem.net/">aquí</a></h6>
                </div>



            </div>



            </div>
        </div>
    )
}
