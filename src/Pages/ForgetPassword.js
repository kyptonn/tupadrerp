import React, {useRef, useState} from 'react'
import logo from '../logo.png'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'


export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
   /*  const { registro } = useAuth() */
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
  

    async function handleSubmit(e) {
        e.preventDefault()

       
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage(<div className="error animate__animated animate__bounceIn">Hemos enviado instrucciones a tu correo</div>)
        } catch {
            setError(  <div className="error animate__animated animate__bounceIn">Error al recuperar la contraseña</div>)
        }

        setLoading(false)
    }
   
    return (
        
        <div className="superior">
            <div className="inicio-sesion">
                
                <Link to="/"><img src={logo}></img></Link>
                <h2>Recuperar Contraseña</h2>
           
              
                    {error && <p>{error}</p>}
                    {message && <p>{message}</p>}

                
                
                <form className="formulario" onSubmit={handleSubmit}>
                    <div className="introducir-datos">
                    <br></br>
                        <input id="email"type="text" ref={emailRef} placeholder="   Introduce tu email" style={{padding:'5px 25px 5px 25px', borderRadius:"10px"}}></input>
                        <br></br>
                        <br></br>
                        <button disabled={loading} type="submit" className="btn btn-warning">Recuperar Contraseña</button>
                        <br></br>
                        <br></br>
                        <h6 className="pregunta">¿Aún no estás registrado? <Link to="/registro">Regístrate</Link></h6>
                        <h6 className="pregunta"><Link to="/login">Login</Link></h6>
                    </div>
                </form>
            </div>


            
        </div>
        
    )
}
