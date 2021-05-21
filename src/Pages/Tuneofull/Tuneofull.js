import React, {useState, useEffect} from 'react'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'
import { useHistory } from 'react-router'
import Loader from "react-loader-spinner";
import emailjs from 'emailjs-com';
import sk from '../../sk.json'

import firebase from '../../firebase'
import db from '../../firebase'
import { Spinner } from 'react-bootstrap';

export default function Tuneofull() {

    let history = useHistory();

    var nombreMoneda = 'RPKoins'
    var costeTuneoFull = 12;

     // COMPROBAR SI ESTA REGISTRADO
     const user = firebase.auth().currentUser;
     /* console.log(user) */
     
     if(!user){
         history.push("/login")
     }
     
     // ID DEL USUARIO (UID)
     const usuarioID = user.uid
     console.log(usuarioID)
     ////////////////////////////////////




    const [datosUsuario, setDatosUsuario] = useState()
    const [loading1, setLoading1] = useState(true)
    const [nombre, setNombre] = useState(null)
    const[loadingFinal, setLoadingFinal] = useState(false)
    useEffect(() =>  {

        const getUser= async() =>  {

            const userDocument = await db.firestore().collection(`users`).doc(usuarioID).get()
            console.log(userDocument.data())
            setDatosUsuario(userDocument.data())
            setLoading1(false)
        }
        getUser()

    },[])

    const canjear = async () => {
        if(nombre == null){
            alert('Introduce el Nombre del Personaje')
            setLoadingFinal(false)
        }else{
            // MIRAMOS CUANTAS MONEDAS TIENE
            let moendasUsuario = await db.firestore().collection('users').doc(usuarioID).get()
            console.log(moendasUsuario.data())

            let datosTMP = moendasUsuario.data()
            let monedasBefore = datosTMP.coins

            let monedasAfter = monedasBefore - costeTuneoFull

            console.log(monedasAfter)

            // QUITAMOS MONEDAS (CANJEAMOS)
            await db.firestore().collection('users').doc(usuarioID).update({
                coins: monedasAfter,
                nombrePersonaje: nombre
            })

            // ENVIAR EMAIL
            var templateParams= {
                from_name:`${usuarioID}`,
                email : `${user.email}`,
                subject:`${usuarioID} ha canjeado Tuneo Full (${nombre})`,
                message:`${usuarioID} ha canjeado Tuneo Full (${nombre})`    
            };
                
            await emailjs.send( sk.sk[0].service, sk.sk[0].template, templateParams, sk.sk[0].user )
            .then((res) => {
                console.log("success", res.status);
                alert('RPKoins Canjeados!')
                history.push('/');
            });
            setLoadingFinal(false)
        }
        
    }


    const alertaCoins = () =>{
        alert(`No tienes suficientes RPKoins. Actualmente tienes ${datosUsuario.coins} RPKoins`)
    }
    const LoaderFinal = () => {
        if(loadingFinal === true){
            return  <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            
        } else return <></>
    } 

    if(loading1){
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
        <div>
            <Navigationbar/>
            <MenuPanel/> 
            <div className="fondo-general-donaciones">
                <div className="container-superior-perfil">
                    <div className="text-center">
                        <br></br>
                        <br></br>
                        <br></br>
                       
                        <h2 className="mt-5 mb-5">Tuneo Full</h2>
                        <h5 style={{maxWidth:'400px', fontWeight:'400'}}>
                            Si quieres exprimir al máximo tu coche, experimentar sus límites, o simplemente darte un capricho,
                            puedes canjear tus puntos por un Tuneo Full.
                        </h5>
                        <br></br>
                        <input placeholder="   Introduce el nombre de tu Personaje"  onChange={(e) => setNombre(e.target.value)} style={{width:'400px'}}></input>
                        <br></br>
                        <br></br>
                        {datosUsuario.coins < 12 ?
                            <button onClick={() => alertaCoins()} className="btn btn-warning">Canjear</button>
                        :
                            <button onClick={() => {setLoadingFinal(true);canjear();}} className="btn btn-warning">Canjear</button>
                        }
                        <h5 className="mt-3">12 RPKoins</h5>
                        <LoaderFinal/>
                    </div>
                </div>
            </div>
        </div>
    )
}
