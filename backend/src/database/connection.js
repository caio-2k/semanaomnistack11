//Importnado o Knex
const knex = require('knex');

//Importando as configurações do banco de dados
const configuration = require('../../knexfile');

//Criando a conexão
const connection = knex(configuration.development);
/**
 * Foi criado a conexão utilizando o knex e passando para ele como parametro
 * o configuration.development que é a conexão de desenvolvimento (dentre varias)
 */

 module.exports = connection;