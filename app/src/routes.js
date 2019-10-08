import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Home from './pages/home';
import Trips from './pages/trips';
import Parceiro from './pages/parceiro';
import Login from './pages/login';


export default function App() {
  return (



    <Router>

        <ul>
            <li> <Link to="/">Início</Link> </li>
            <li> <Link to="/trips">Trips</Link> </li>
            <li><Link to="/parceiro">Ser parceiro</Link></li>
            <li><Link to="/login">Entrar</Link></li>
        </ul>

        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/trips" component={TripsPage}></Route>
          <Route path="/parceiro" component={ParceiroTrips}></Route>
          <Route path="/login" component={LoginPage}></Route>
        </Switch>
     
    </Router>
  );
}

const HomePage = () => {
    return (
        <div className="trp-home">
            <Home title="Home" />
        </div>
    )
}

const TripsPage = () => {
    return (
        <div className="trp-trips">
            <Trips title="Viagens" />
        </div>
    )
}

const ParceiroTrips = () => {
    return (
        <div className="trp-parceiro-trips">
            <Parceiro title="Viagens" />
        </div>
    )
}

const LoginPage = () => {
    return (
        <div className="trp-login-trips">
            <Login title="Login" />
        </div>
    )
}

