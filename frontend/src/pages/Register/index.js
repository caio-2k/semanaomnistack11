import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';  
import logoImg from '../../assets/logo.svg'

//Importando a API
import api from '../../services/api';

export default function Register(){

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    //Retornando uma resposta de cadastro feito com sucesso após aguardar a finalização (Await)  
    const response = await api.post('ongs', data);

  try{
    alert(`Seu ID de acesso: ${response.data.id}`);
    //Data é o resultado da resposta e o ID é o campo de ID gerado.
    
    history.push('/'); //Empurrando para a rota raíz.
    
    }catch(err){
      alert('Erro no cadastro, tente novamente');
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>

          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já possuo cadastro!
          </Link>
        </section>
        
        <form onSubmit={handleRegister}>

          <input placeholder="Nome da ONG" 
          value={name} 
          onChange={e => setName(e.target.value)} />
          {/*e . target representa o valor do input e ta colocando ele
          dentro da variavel name que ta sendo armazenada no estado arrow function*/}

          <input type="email" placeholder="E-mail"
          value={email} 
          onChange={e => setEmail(e.target.value)} />

          <input placeholder="Whatsapp"
          value={whatsapp} 
          onChange={e => setWhatsapp(e.target.value)} />

          <div className="input-group">

            <input placeholder="Cidade"
            value={city} 
            onChange={e => setCity(e.target.value)} />

            <input placeholder="UF" style={{ width: 80 }}
            value={uf} 
            onChange={e => setUf(e.target.value)} />

          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}