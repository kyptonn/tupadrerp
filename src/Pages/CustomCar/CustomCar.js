import React, {useState, useEffect} from 'react'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'
import { useHistory } from 'react-router'

import emailjs from 'emailjs-com';
import sk from '../../sk.json'

import firebase from '../../firebase'
import db from '../../firebase'


export default function CustomCar() {
    let history = useHistory();

    var nombreMoneda = 'RPKoins'
    var costeCocheCustom = 30;

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



    useEffect(() =>  {

        const getUser= async() =>  {

            const userDocument = await db.firestore().collection(`users`).doc(usuarioID).get()
            console.log(userDocument.data())
            setDatosUsuario(userDocument.data())
            setLoading1(false)
        }
        getUser()

    },[])



    const [enlace, setEnlace] = useState()


    const canjear = async () => {

        // MIRAMOS CUANTAS MONEDAS TIENE
        let moendasUsuario = await db.firestore().collection('users').doc(usuarioID).get()
        console.log(moendasUsuario.data())

        let datosTMP = moendasUsuario.data()
        let monedasBefore = datosTMP.coins

        let monedasAfter = monedasBefore - costeCocheCustom

        console.log(monedasAfter)

        // QUITAMOS MONEDAS (CANJEAMOS)
        await db.firestore().collection('users').doc(usuarioID).update({
            coins: monedasAfter
        })
   
        // ENVIAR EMAIL
        var templateParams= {
            from_name:`${usuarioID}`,
            email : `${user.email}`,
            subject:`${usuarioID} ha canjeado Coche Custom: ${enlace}`,
            message:`${usuarioID} ha canjeado Coche Custom: ${enlace}`    
        };
            
        await emailjs.send( sk.sk[0].service, sk.sk[0].template, templateParams, sk.sk[0].user )
        .then((res) => {
            console.log("success", res.status);
            alert('RPKoins Canjeados!')
            history.push('/');
        });
        

    }


    const alertaCoins = () =>{
        alert(`No tienes suficientes RPKoins. Actualmente tienes ${datosUsuario.coins} RPKoins`)
    } 



    if(loading1){
        return (
            <>
            <Navigationbar/>
            <MenuPanel/> 
            <div className="fondo-general-donaciones"></div>
            {/* {getCoche()} */}
            </>
            )
    } 


    return (
        <div>
            <Navigationbar/>
            <MenuPanel/> 
            <div className="fondo-general-donaciones">
                <div className="container-superior-perfil">
                <br></br>
                <br></br>
                <br></br>
                    <h2>Coche Custom</h2>
                    <br></br>
                    <br></br>
                    <h3 className="mb-3">Pasos</h3>
                    <h5><li>Dirigete a GTA V Mods, haciendo  <a target="_blank" href="https://es.gta5-mods.com/vehicles/tags/add-on+car">click aquí</a></li></h5>
                     <h5><li>Elige el coche que más te guste</li></h5>
                     <h5><li>Abajo, introduce el enlace del coche</li></h5>
                     <h5><li>Haz click en Canjear</li></h5>
                     <h5><li>¡Listo!</li></h5>
                    <br></br>
                    <br></br>
                    <input placeholder="   Introduce el enlace"  onChange={(e) => setEnlace(e.target.value)} style={{width:'400px'}}></input>
                    <br></br>

                    {datosUsuario.coins < 30 ?
                        <button onClick={() => alertaCoins()} className="btn btn-warning">Canjear</button>
                    :
                        <button onClick={() => canjear()} className="btn btn-warning">Canjear</button>
                    }
                    <h5 className="mt-2">30 RPKoins</h5>

                </div>
            
            </div>    
        </div>
    )
}
