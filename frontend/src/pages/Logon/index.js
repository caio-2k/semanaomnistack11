import React, { useState } from 'react';

//Importando recurso necessário para evitar linkar uma página para outra
//e carregar todo o conteúdo até a mesma, ao invés de ahref utilizamos
//Link To, com isso só a rota será trocada
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

//Importando CSS
import './styles.css';

//Importar imagem
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'

//Importando o pacote de ícones
import { FiLogIn } from 'react-icons/fi';
//Desestruturação realizada para pegar apenas determinados icones

export default function Logon(){

  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    //Função com objetivo de verificar se a ONG existe
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      //Salvando dados no storage do navegador
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
      
    } catch (error) {
      alert ('Falha no login, tente novamente');
    }

  }

  return(

    <div className="logon-container">

      <section className="form">

        <img src={logoImg} alt="Be The Hero"/>
        
        <form onSubmit={handleLogin}>

          <h1>Faça seu Logon</h1>

          <input 
            placeholder="Sua ID" 
            value={ id }
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>

        </form>

      </section>

      <img src={heroesImg} alt="Heroes"/>

    </div>

  );

}