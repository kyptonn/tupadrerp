import React, {useContext} from 'react'
import Navigationbar from '../../../Components/Navigationbar'
import {GlobalCoins} from '../../../contexts/CartContext'

import {loadStripe} from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import '../../styles/generales.css'
const stripePromise = loadStripe('pk_test_51I1ylgLxLGKcNyROD5ys32ZsyLW8EU1YOentpSQcuaaQGaQoe2jpQHj7c6ALJDqIAg8h3kQaOpGHSwGcx92MbHwC0081ixUjFw')


const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if(!error){
            console.log(paymentMethod)
        }
    }


    return (
    <form onSubmit={handleSubmit} /* className="card" */>
        <input  placeholder="  Nombre"></input>
        <br></br>
        <input  placeholder="  Email"></input>     
        <br></br>
        <input  placeholder="  Dirección"></input>
        <br></br>
        <input  placeholder="  Ciudad"></input>
        <br></br>
        <input  placeholder="  Estado"></input>
        <br></br>
        <input  placeholder="  Código Postal"></input>
        <br></br>
        <br></br>
        <div className="card-div-element">
            <CardElement />
        </div>
        <button>Comprar</button>
        <br></br>
        <br></br>
    </form>)
}

export default function Pago() {


    const [monedas, setMonedas] = useContext(GlobalCoins)


    return (
        <div>
            <Navigationbar/>
            <div className="fondo-general-inicio">
                    {/* <h4>{monedas}</h4> */}
                <br></br>
                <br></br>
                <br></br>

                <div  className="form-center">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </div>
            
                  

              
             </div>
        </div>
    )
}
