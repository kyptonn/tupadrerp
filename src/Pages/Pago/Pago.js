import React, {useContext} from 'react'
import Navigationbar from '../../Components/Navigationbar'
import {GlobalCoins} from '../../contexts/CartContext'


export default function Pago() {


    const [monedas, setMonedas] = useContext(GlobalCoins)


    return (
        <div>
             <Navigationbar/>

             <div className="fondo-general-inicio">
             <div className="contenedor-general-inicio">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>Realiza el Pago</h1>
                <br></br>
                <br></br>
                <h6>Actualmente sólo aceptamos pagos por Bizum.</h6>
                <h6>A continuación te mostramos el Número para realizar el ingreso.</h6>
                <br></br>
                
                <br></br>
                <h4>RPKoins</h4>
                <h4>{monedas}</h4>
                <br></br>
                <br></br>
                <h4>Total</h4>
                <h4>{monedas*0.25}€</h4>
                <br></br>
                <h6 style={{color:'yellow'}}><strong>Es obligatorio poner tu Mail como asunto en Bizum</strong></h6>
                
                <h3 className="animate__animated animate__fadeInUp" style={{marginTop:'40px'}}>(+34) 692185043</h3>
            
                <br></br>
                <br></br>

                <h5 className="animate__animated animate__fadeInUp">Una vez hayas realizado el pago, el sistema suele tardar procesarlo unos 30 minutos </h5>







             </div>
              

                 
             </div>
        </div>
    )
}
