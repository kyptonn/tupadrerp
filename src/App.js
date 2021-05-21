import logo from './logo.svg';
import './App.css';




import  { BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect
} from 'react-router-dom';
import Home from './Pages/Home';
import Donaciones from './Pages/Donaciones/Donaciones';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Pages/InicioSesion/InicioSesion';
import Singup from './Pages/Register/Register';
import Panel from './Pages/Panel/Panel';
import Perfil from './Pages/Perfil/Perfil';
import Coins from './Pages/Coins/Coins';
import Contacto from './Pages/Contacto/Contacto';
import ComoJugar from './Pages/ComoJugar/ComoJugar';
import Pago from './Pages/Pago/Pago';
import PremiumCar from './Pages/PreiumCar/PremiumCar';
import CanjearCoche from './Pages/CanjearCoche/CanjearCoche';
import CustomCar from './Pages/CustomCar/CustomCar';
import Tuneofull from './Pages/Tuneofull/Tuneofull';
import Eventos from './Pages/Eventos/Eventos';
import CambiarAvatar from './Pages/CambiarAvatar/CambiarAvatar';


//Pages




function App() {




  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          
          
          <Route exact path="/como-jugar" component={ComoJugar}/>

          <Route exact path="/contacto" component={Contacto}/>
          
          <Route exact path="/panel/eventos" component={Eventos}/>

          <Route exact path="/cambiar-avatar" component={CambiarAvatar}/>


          <Route exact path="/login" component={Login}/>
          <Route exact path="/registro" component={Singup}/>

          <Route exact path="/panel" component={Panel}/>
          <Route exact path="/panel/perfil" component={Perfil}/>
          <Route exact path="/panel/donaciones" component={Donaciones}/>
          <Route exact path="/panel/comprar-coins" component={Coins}/>
          <Route exact path="/panel/comprar-coins-pago" component={Pago}/>

          <Route exact path="/panel/donaciones/premium-car" component={PremiumCar}/>
          <Route exact path="/panel/donaciones/coche-custom" component={CustomCar}/>
          <Route exact path="/panel/donaciones/tuneo-full" component={Tuneofull}/>



         {/*  <Route exact path="/panel/donaciones/canjear-coche" component={CanjearCoche}/> */}
          <Route exact path="/panel/donaciones/premium-car/:id" render={props => <CanjearCoche {...props}/>}/>

          {/* <Redirect to="/404" />  */}
        </Switch>
      </Router>
      </AuthProvider>
  );
}

export default App;
