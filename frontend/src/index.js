import React from 'react';
//Integração do React com o navegador (árvore de elementos)
import ReactDOM from 'react-dom';
//IMportando app.js dentro de uma variavel app
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
/**
 * ReactDOM está rendenrizando (clocando em tela)
 * o app (como uma tag html) dentro da div com ID root
 * atraves do document.
 * Ou seja, um componente no react nada mais é do que uma função que
 * retorna HTML (ela pode ter funcionalidade javascript, css , etc), 
 * porém quando esse html está escrito(integrado) dentro do javascript 
 * a gente chama isso de JSX (Javascript XML(sintaxe do html))
 */
