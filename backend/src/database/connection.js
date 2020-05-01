//Importnado o Knex
const knex = require('knex');

//Importando as configurações do banco de dados
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

//Criando a conexão 
const connection = knex(config);
/**
 * Foi criado a conexão utilizando o knex e passando para ele como parametro
 * o configuration.development que é a conexão de desenvolvimento (dentre varias)
 */

 module.exports = connection;