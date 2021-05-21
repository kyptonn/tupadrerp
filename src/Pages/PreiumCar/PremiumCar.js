import React, {useState, useEffect} from 'react'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'
import coches from '../../coches/coches.json'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import db from '../../firebase'
import './PremiumCar.css'
import { Link, useHistory } from 'react-router-dom'

export default function PremiumCar() {
    let history = useHistory();

    const [loading, setLoading] = useState(true)
/*     const [datosCoches, setDatosCoches] = useState()

    const arrayCoches = [] */

/*     useEffect(() => {
        const getCars = async() =>  {
            const carsData = await db.firestore().collection(`coches`).doc('Coches22').get();
            console.log(carsData.data()) 

            setDatosCoches(carsData.data()) 
            setLoading(false)
        }
        getCars()
    },[])
 */
    



    /* if(loading1){
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
    }  */
    function handleClick(coche) {
        history.push(`/panel/donaciones/premium-car/${coche}`);
    }

    return (
        <div>
            <Navigationbar/>
            <MenuPanel/>

            <div className="fondo-general-donaciones">
                <div className="contenedor-general-panel">
                    <h1>Coches Premium</h1>
                    <div className="textCenter">
                    <br></br>
                    <h5 style={{marginBottom:'-20px'}}>Todos los Coches Premium tienen un coste de 20 RPKoins</h5>
                    </div>
                    <div  className="opciones-donaciones">   
                        {coches.map(coche => (
                            
                            <div onClick={() => handleClick(coche.nombre)} className="card-coches">
                                <img src={coche.url}/>
                                <br></br>
                                <p style={{fontWeight:"600"}}>{coche.nombre}</p>
                            </div>

                        ))}
                    </div>



                    <div className="textCenter">
                    <br></br>
                    <h5>Todos los Coches Premium tienen un coste de 20 RPKoins</h5>
                    <br></br>
                    <br></br>

                    </div>
                    
                </div>





            </div>
        </div>
    )
}
