import React from 'react'
import './MenuPanel.css'

import {Link} from 'react-router-dom'




export default function MenuPanel() {
    return (
        <div>
            <div className="menu-izquierda-panel">
                <div className="lista-menu-panel">

                    <Link to="/panel/perfil"><ul className="primer-elemento-lista">Perfil</ul></Link>
            
                    <Link to="/panel/donaciones"><ul>Donaciones</ul></Link>
                    <Link to="/panel/eventos"><ul>Eventos</ul></Link>
                    <Link to="/contacto"><ul>Soporte</ul></Link>
                 


                    
                </div>

            </div>
        </div>
    )
}
