import React, { useState, useEffect } from 'react'
import Loader from 'react-spinners/CircleLoader'
import MenuPanel from '../../Components/MenuPanel/MenuPanel'
import Navigationbar from '../../Components/Navigationbar'

import {Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import app from '../../firebase'
import firebase from '../../firebase'

export default function CambiarAvatar() {

    const history = useHistory()
    const db = app.firestore()
    const [fileUrl, setFileUrl] = useState(null) 

      // UID DEL USUARIO
      const {currentUser} = useAuth()
      const usuarioID =currentUser.uid 
        
      const [usuario, setUsuario] = useState("Usuario")
    
      useEffect(() => {
      },[usuario])

 

            const getUser = async () => {
                const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
            
                const dataUsuario = userDocument.data();
                const nombreUsario = dataUsuario.displayName; //
                setUsuario(nombreUsario)// SE MUESTRA EL USUARIO
             
            } 
            getUser()
          
    
      


  


     // imagen
     const onFileChange = async (e) => {
        const userDocument = await firebase.firestore().collection(`users`).doc(usuarioID).get();
        console.log(e)
        const dataUsuario = userDocument.data();
        const nombreUsario = dataUsuario.displayName; 


        const file = e.target.files[0]
        console.log(file)                               
        const storageRef = app.storage().ref(`Avatar/${nombreUsario}`)
        const fileRef = storageRef.child(file.name) 
        console.log(fileRef)
        await fileRef.put(file)                                                     
        setFileUrl(await fileRef.getDownloadURL())
        
        
    }

    


    const onSubmit = async (e) => {
        e.preventDefault()


        db.collection('users/').doc(usuarioID).update({
            avatar: fileUrl
           
        })
       

        await console.log('archivo subido correctamente')
        await alert('Avatar actualizado correctamente!')

        history.push('/panel') 

    }



    return (
        <div>
             <Navigationbar/>
            <MenuPanel/> 
            <div className="fondo-general-donaciones">
                <div className="container-superior-perfil">
                    <br></br>
                    <br></br>
                        <h2 className="mt-5">Cambiar Avatar</h2>
                    {/* <h2>Próximamente</h2>
                    <Loader/> */}
                    <br></br>
                    <br></br>
                        <h4>Selecciona tu avatar</h4>
                    <br></br>
                    <br></br>

                    <form onSubmit={onSubmit}>
                        <input type='file' id='select-avatar' className="input-avatar" onChange={onFileChange}></input>
                       {/*  <label for="select-avatar" className="subir-avatar">Selecciona tu Avatar</label> */}
                        <br></br>


                        <div className="text-center">
                        <button className="btn btn-warning mt-5">Actualizar</button>

                        </div>


                    </form>

                    <img className="imagen-avatar" src={fileUrl}></img>

                    


                </div>
            </div>
        </div>
    )
}
