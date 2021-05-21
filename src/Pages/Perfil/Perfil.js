import React, {useState, useEffect} from 'react'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'
import './Perfil.css'
import perfilCirculo from './perfil-circulo.png'
import gonzalez from './gonzalez.png'
import { Link } from 'react-router-dom'
import db from '../../firebase'

import {useAuth} from '../../contexts/AuthContext'


export default function Perfil() {
    
    // UID DEL USUARIO
    const {currentUser} = useAuth()
    const usuarioID =currentUser.uid 
    
    const [usuarioEmail, setUsuarioEmail] = useState()
    const [usuarioNombre, setUsuarioNombre] = useState()
    const [usuarioCoins, setUsuarioCoins] = useState()
    const [usuarioFoto, setUsuarioFoto] = useState()

   

    
    
        useEffect(() => {
            const getUser= async() =>  {
    
                const userDocument = await db.firestore().collection(`users`).doc(usuarioID).get()
                console.log(userDocument.data())

                const dataUsuario = userDocument.data()

                const emailUsuario = dataUsuario.email


                setUsuarioEmail(emailUsuario)
                setUsuarioNombre(dataUsuario.displayName)
                setUsuarioCoins(dataUsuario.coins)

                if(dataUsuario.avatar == null){
                    setUsuarioFoto(gonzalez)
                }else{
                    setUsuarioFoto(dataUsuario.avatar)

                }

            }
            getUser()

        },[])


   

  

    
    



    return (
        <div>
            <Navigationbar/>
            <MenuPanel/>

            <div className="fondo-general-inicio">
                <div className="container-superior-perfil">

                    <div className="card1-perfil">
                        <h1>Kyptonn</h1>

                        <img className="imagen-avatar-perfil" src={usuarioFoto}/>
                        {/* <Link to="/cambiar-avatar">Cambiar Avatar</Link> */}
                        
                        {/* <h6>Usuario creado el 11/02/2019</h6> */}
                    </div>




                    <div className="card2-perfil">

                       <h3>Nombre Usuario: <strong>{usuarioNombre}</strong></h3>
                       <h3>Email: <strong>{usuarioEmail}</strong>{/* <Link to="">Cambiar Email</Link> */} </h3>


                       <h3>Contraseña: ****** {/* <Link to="">Cambiar Contraseña</Link> */}</h3>
                       <br></br>
                       <h3>ViKoins: <strong>{usuarioCoins}</strong><Link to="/panel/comprar-coins">Comprar ViKoins</Link></h3>
                    </div>


                </div>


            </div>
        </div>
    )
}
