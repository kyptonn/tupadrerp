import React from 'react'
import Navigationbar from '../Components/Navigationbar'
import TextLoop from "react-text-loop";
import {Link} from "react-router-dom";
import './Home.css'
import logo from '../logo.png'

export default function Home() {
    return (
        <div>
            <Navigationbar/>
            <div className="fondo-general-inicio">
                <div className="contenedor-general-inicio">
                    <img src={logo}/>
             
                    <h2>
                        <br></br>
                        <TextLoop interval={3000} springConfig={{ stiffness: 180, damping: 8 }}>
                            
                            <div>
                                <span>Descubre tu rol </span> 
                            </div>

                            <div>
                                <span>Disfruta de tu historia </span>
                            </div>

                            <div>
                                <span>Siente la experiencia </span> 
                            </div>

                            <div>
                                <span>Crea amistades </span>
                            </div>
                            
                        </TextLoop> 
                    </h2>


                    <div className="contenedor-redes-sociales">
                        <div className="redes-sociales">

                            <div className="discord">
                            <a href="https://discord.gg/ttAWeYA3bq"> <i class="fab fa-discord"></i></a>
                            </div>

                            {/* <div className="youtube">
                            <a href="https://youtube.com"> <i class="fab fa-youtube"></i></a>
                            </div>

                            <div className="twitter">
                                <a href="https://twitter.com"><i class="fab fa-twitter"></i></a>
                            </div> */}

                        </div>
                    </div>

                    <div className="boton-jugar">
                        <Link to="/como-jugar"><button type="button" class="btn btn-outline-light btn-lg">Cómo Jugar</button></Link>
                    </div>

                    <div className="boton-donaciones">
                        <Link to="/panel/donaciones"><button type="button" class="btn btn-outline-warning btn-lg">Donaciones</button></Link>
                    </div>

                </div>


               

            </div>

        </div>
    )
}
