import React, {useState, useEffect} from 'react'
import Navigationbar from '../../Components/Navigationbar'
import './Contacto.css'
import emailjs from 'emailjs-com';
import sk from '../../sk.json'

import {useHistory} from 'react-router-dom'

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";


export default function Contacto() {

    let history = useHistory();

    const [nombre, setNombre] = useState()
    const [mail, setEmail] = useState()
    const [asunto, setAsunto] = useState("Nuevo mensaje")
    const [mensaje, setMensaje] = useState()
   
    

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    
  
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    let [boton, setBoton] = useState()
  
  function enviarMensaje() {


        console.log(nombre, mail, asunto, mensaje)
        
        // ENVIAR EMAIL
        var templateParams= {
            from_name:`${nombre}`,
            email : `${mail}`,
            subject:`${asunto}`,
            message:`${mensaje}`    
        };
        
        emailjs.send( sk.sk[0].service, sk.sk[0].template, templateParams, sk.sk[0].user )
        .then((res) => {
            console.log("success", res.status);
            alert('Mensaje Enviado!')
            history.push('/');
        });
    

    }



    return (
        <div>
            <Navigationbar/>
            <div className="fondo-general-inicio">
                <div className="container-superior-contacto">

                    <h2>Contacto</h2>

                    <div className="card1-contacto">

                        <h4 className="primer-elemento-contacto">Nombre</h4>
                        <input className="input-contacto" onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre"></input>

                        <h4>Email</h4>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Nombre"></input>

                        <h4>Asunto (opcional)</h4>
                        <input onChange={(e) => setAsunto(e.target.value)} type="text" placeholder="Nombre"></input>

                        <h4>Mensaje</h4>                        
                        <textarea onChange={(e) => setMensaje(e.target.value)} className="text-area-contacto" type="text" placeholder="Nombre"></textarea>
                        <br></br>
                        <br></br>
                        <button className={boton} onClick={() =>{ enviarMensaje(); setLoading(!loading); setBoton("invisible")}}>Enviar</button>

                        <div className="sweet-loading">
                            <ClipLoader color="white" loading={loading} css={override} size={25} width={5} radius={2} margin={2}/>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
