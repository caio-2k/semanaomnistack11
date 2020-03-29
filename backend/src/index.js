//Importando o express (contendo todas as suas funcionalidades) p/ variável "express".
const express = require('express');

//IMportando as rotas da aplicação
const routes = require('./routes');

//Importando o CORS
const cors = require('cors');

//Detalhe: importação é require.  

//Criação de uma variável responsável por armazenar a aplicação
const app = express();

/*Caso seja posto em produção (acesso frontend espec):
app.use(cors({
  origin: 'http://asdassda'
}));*/

//Em desenvolvimento (acesso frontend livre):
app.use(cors());

//Informar para a aplicação que estaremos utilizando JSON para o corpo das requisições
app.use(express.json());
/**
 * Detalhe: o app.use deve vir antes das rotas, eu falo pro express ir lá no corpo
 * da minha requisição e converter o json em objeto do javascript, transformar o json em
 * algo entendivel pela aplicação.
 */

 //Agora usando as rotas importadas
 app.use(routes);


//Mandar a aplicação ouvir a porta 3333
//Node = 3333, React = 3000
app.listen(3333);
//Necessário para acessar o localhost e obter acesso a aplicação


//Seguinte: Criar projeto REACT.



