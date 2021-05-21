import React from 'react'
import Loader from 'react-spinners/GridLoader'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'

export default function Eventos() {
    return (
        <div>
            <Navigationbar/>
            <MenuPanel/> 
            <div className="fondo-general-donaciones">
                <div className="contenedor-general-panel">
                    <div className="text-center">
                    <h2>Próximamente</h2>
                    <Loader/>

                    </div>


                </div>
            </div>
        </div>
    )
}
