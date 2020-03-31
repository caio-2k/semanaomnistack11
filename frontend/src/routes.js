import React from 'react';

//Importando o pacote responsável por lidar com rotas na aplicação
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//Browser Router = Necessário para que o roteamento funcione, ele deve estar por volta de tudo
//Route = Cada uma das rotas (propriedade exact = o caminho precisa ser exatamente o informado)
//Switch = Ele vai garantir que apenas uma rota seja executada por momento

//Importando a primeira página (Logon)
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

//As rotas também serão um COMPONENTE, portanto:
export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/incidents/new" component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  );
}
