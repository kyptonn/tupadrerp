import React, {useState, useEffect} from 'react'
import Navigationbar from '../../Components/Navigationbar'
import { AuthProvider } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import firebase from '../../firebase'
import db from '../../firebase'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import MenuPanel from '../../Components/MenuPanel/MenuPanel';

import './Donaciones.css'

import coin from '../../RPKoin.png'


export default function Donaciones() {
    let history = useHistory();
   
    var nombreMoneda = 'RPKoins'


    // COMPROBAR SI ESTA REGISTRADO
    const user = firebase.auth().currentUser;
    
    if(!user){
        history.push("/login")
    }
    ////////////////////////////////////
    
    const usuarioID = user.uid
    console.log(usuarioID)

    const [loading, setLoading] = useState(true)
    const [datosUsuario, setDatosUsuario] = useState()

    useEffect(() => {

        const getUser= async() =>  {

            const userDocument = await db.firestore().collection(`users`).doc(usuarioID).get()
            console.log(userDocument.data())
            setDatosUsuario(userDocument.data())
            setLoading(false)


        }
        getUser()

    },[])


    const alertaCoins = () =>{
        alert('No tienes suficientes RPKoins')
    } 
    



    if(loading){
        return (
            <div className="overflow-x-disabled">
                <Navigationbar/>
                <MenuPanel/>
                <div className="fondo-general-donaciones">
                <div className="contenedor-general-panel">

                    <div style={{marginLeft:'15%',display:'flex',justifyContent:'center'}}>
                    <Loader type="Oval" color="#00BFFF" height={80} width={80} />
                    </div>


                </div>
                </div>


            </div>

        )
    }

   

    return (
        <div className="overflow-x-disabled">
            <Navigationbar/>
            <MenuPanel/>

            <div className="fondo-general-donaciones">


                <div className="contenedor-general-panel">
                    <h1>Donaciones</h1>

                    <div className="compra-coins">
                        <img className="coin" src={coin}/>

                        <div className="informacion-compra-coin">
                            <h2>{nombreMoneda}</h2>
                            <h5>Puedes gastar los {nombreMoneda} por diferentes opciones. Abajo encontrarás las diferentes opciones.</h5>
                            <Link to="/panel/comprar-coins"><button type="button" class="btn btn-warning"> Comprar</button></Link>
                        </div>

                    </div>
                    <div className="current-coins">
                        <h3>RPKoins: {datosUsuario.coins}</h3>


                    </div>

                    


                    <div className="opciones-donaciones">

                       {/*  <div className="card-donaciones">
                            <i class="fas fa-clipboard-list"></i>
                            <p>Quitar multa</p>

                      
       
                                <Link to="/panel/donaciones/quitar-multa">
                                    <button className="donaciones-coins">Comprar (10 {nombreMoneda})</button> 
                                </Link>
                               
                        
                        </div> */}

                        <div className="card-donaciones">
                            <i class="fas fa-car"></i>
                            <p>Tuneo Full</p>

                         
                                <Link to="/panel/donaciones/tuneo-full">
                                    <button className="donaciones-coins">Comprar (12 {nombreMoneda})</button>
                                </Link>
                        
                        </div>

                        <div className="card-donaciones">
                            <i class="fas fa-car"></i>
                            <p>Coche Premium</p>

                          
                                <Link to="/panel/donaciones/premium-car">
                                <button className="donaciones-coins">Comprar (20 {nombreMoneda})</button>
                                </Link>
                        
                           
                        </div>

                        <div className="card-donaciones">
                            <i class="fas fa-car"></i>
                            <p>Coche Custom</p>

                           
                                <Link to="/panel/donaciones/coche-custom">
                                    <button className="donaciones-coins">Comprar (30 {nombreMoneda})</button>
                                </Link>
                     
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
