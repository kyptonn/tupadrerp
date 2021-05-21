import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'
import coin from '../../RPKoin.png'

import './Coins.css'


import {GlobalCoins} from '../../contexts/CartContext'
import { Spinner } from 'react-bootstrap'

export default function Coins() {

    const [monedas, setMonedas] = useContext(GlobalCoins)


    const [coins, setCoins] = useState(0)
    const [aceptado, setAceptado] = useState(false)
    const [buttonStyle, setButtonStyle] = useState('btn btn-dark')

    useEffect( () => {
    if(aceptado === true && coins >1){
        setButtonStyle("btn btn-warning")
    } else if ( aceptado === false) {
        setButtonStyle("btn btn-dark hide")
    }

    },[coins, aceptado])
    
    


    

    return (
        <div>
            <Navigationbar/>
            <MenuPanel/>

            <div className="fondo-general-inicio">
                <div className="container-superior-perfil">
                    <br></br>
                    <br></br>


                    <h1>Comprar RPKoins</h1>

                    <div className="card1-perfil">
                        <p>Los RPKoins son monedas, con las cuales puedes canjear por diferentes servicios.</p>
                    </div>

                    <div className="card2-comprar">
                        <img src={coin}/>
                        <h2> = </h2>
                        <h2>0,25€</h2> 
                   



                    </div>


                    <div className="card3-comprar">
                        <h4>Ingresa la cantidad</h4>
                        <h6>(RPKoins)</h6>
                        <input onChange={(e) => {setCoins(e.target.valueAsNumber);setMonedas(e.target.valueAsNumber)}}type="number"></input>
                        <h5>{coins} RPKoins = {coins*0.25} €</h5>
                        <div className="terminos">
                            <p><input onClick={() => setAceptado( aceptado !== true ? true : false)} type="checkbox"/> Acepto los {/* <Link to="/terminos"> */}Términos{/* </Link> */}</p>
                        </div>


                        <Link to="/panel/comprar-coins-pago"><button type="button" className={buttonStyle}> Comprar</button></Link>

                    </div>
<br></br>
<br></br>
<br></br>
                </div>

            </div>

        </div>
        
    )
}
