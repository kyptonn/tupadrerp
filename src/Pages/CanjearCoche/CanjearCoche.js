import React, {useState, useEffect} from 'react'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'
import coches from '../../coches/coches.json'
import './CanjearCoche.css'
import { useHistory } from 'react-router'

import emailjs from 'emailjs-com';
import sk from '../../sk.json'

import firebase from '../../firebase'
import db from '../../firebase'
import Loader from 'react-spinners/BarLoader'




export default function CanjearCoche() {
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [datosUsuario, setDatosUsuario] = useState(true)
    const [nombre, setNombre] = useState(null)
    let history = useHistory();
   
    var nombreMoneda = 'RPKoins'
    var costeCochePremium = 20;


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

    useEffect(() =>  {

        const getUser= async() =>  {

            const userDocument = await db.firestore().collection(`users`).doc(usuarioID).get()
            console.log(userDocument.data())
            setDatosUsuario(userDocument.data())
            setLoading1(false)


        }
        getUser()

        function getCoche(){
            for ( let i = 0 ; i<coches.length ; i++ ){
                let buscar = coches[i]
                if(buscar.nombre == coche){
                    cocheSeleccionado.push(buscar)
                    setSelectedCar(buscar)
    
                    setLoading2(false)
                }
            }
    
        }
        getCoche()

    },[])


    let pathname = window.location.pathname;
    let link = pathname.split("/")
    let coche = link[4]


    let cocheSeleccionado = []

    const [selectedCar, setSelectedCar] = useState()
  
    const alertaCoins = () =>{
        alert('No tienes suficientes RPKoins')
    } 
    

    
    
   
    
   /*  let [color, setColor] = useState("#ffffff");
    let [boton, setBoton] = useState() */


    const canjear = async () => {

        if(nombre == null){
            alert('Introduce el Nombre del Personaje')
        }else{
            // MIRAMOS CUANTAS MONEDAS TIENE
            let moendasUsuario = await db.firestore().collection('users').doc(usuarioID).get()
            console.log(moendasUsuario.data())
    
            let datosTMP = moendasUsuario.data()
            let monedasBefore = datosTMP.coins
    
            let monedasAfter = monedasBefore - costeCochePremium
    
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
                subject:`${usuarioID} ha canjeado Coche Premium: ${selectedCar.nombre}. Nombre del Personaje: ${nombre}`,
                message:`${usuarioID} ha canjeado Coche Premium: ${selectedCar.nombre}. Nombre del Personaje: ${nombre}`    
            };
                
            await emailjs.send( sk.sk[0].service, sk.sk[0].template, templateParams, sk.sk[0].user )
            .then((res) => {
                console.log("success", res.status);
                alert('RPKoins Canjeados!')
                history.push('/');
            });
            

        }


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
            {console.log(selectedCar)}
            <div className="fondo-general-donaciones">
                <div className="contenedor-general-panel">

                    <div className="textCenter">
                        <h2 style={{marginTop:35}}>Coche Premium</h2>
                    </div>

                    <div style={{marginTop:35}} className="opciones-donaciones">
                        <div className="card-coches-canjear">
                            <img src={selectedCar.url}/>
                            <br></br>
                            <p style={{fontWeight:"700"}}>{selectedCar.nombre}</p>
                        </div>

                    </div>


                    <div className="textCenter">
                        <br></br>
                        <h3><strong>20 RPKoins</strong></h3>
                        <br></br>
                        <h4>Introduce el Nombre del Personaje</h4>
                        <input placeholder='   Introduce el nombre de tu Personaje' onChange={(e) => {setNombre(e.target.value)}} style={{width:'300px'}}/>
                        <br></br>
                        <br></br>
                        {datosUsuario.coins < 20 ?
                            
                            <button onClick={() => alertaCoins()} className="btn btn-warning">Canjear</button>
                            :
                            <button onClick={() => canjear()} className="btn btn-warning">Canjear</button>
                        }



                    </div>                        




                </div>
            </div>
          
          
        </div>
    )
}
