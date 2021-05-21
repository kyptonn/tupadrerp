import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigationbar from '../../Components/Navigationbar';

import { auth, createUserDocument } from '../../firebase';
import logo from '../../logo.png'

import './InicioSesion.css'




class Login extends Component {
  state = { email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        
    } catch (error) {
        console.log('error logging in', error);
        alert('Error al iniciar la sesión. Comprueba los campos')
      }/* alert('la sesion se ha iniciado correctamente') */
      if (window.confirm('La sesión se ha iniciado correctamente')) 
        {
        window.location.href='/';
        };


    }

    // this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;
    return (
        <>
            <Navigationbar/>
            <div className="superior">
                <form className="signup-login" onSubmit={this.handleSubmit}>
                <div className="container-master">
                <Link to="/"><img src={logo}></img></Link>
                    <h2>Iniciar Sesión</h2>
                    <br/>


                    <label>Email</label>
                    <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Email"
                    />

                    <br></br>

                    <label>Contraseña</label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Contraseña"
                    />

                    <br></br>
                    
                    <button>Iniciar Sesión</button>

                    <br></br>

                    <p><Link to="/recuperar-contrasena"> ¿Has olvidado la contraseña?</Link></p>
                    <p><Link to="/registro">¿Aún no tienes cuenta?</Link></p>
                    
                </div>
                </form>
                <br></br>
            </div>

        </>
     
    );
  }
}

export default Login;