const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


//Criando o ID da ong através do pacote crypto
//Ele possui um metodo para gerar uma string aleatoria
//const crypto = require('crypto');

//Importando connection para os arquivos que preciso me comunicarr
//const connection = require('./database/connection');

//Desacoplando o módulo de rotas do express em uma nova variavel
const routes = express.Router();

//Criar uma rota para listar todas as ongs do banco de dados
//Essencial para acompanhar os cadastros no BD
// routes.get('/ongs', async (request, response) => {
//   const ongs = await connection ('ongs').select('*');

//   //Retornando um array
//   return response.json(ongs);
// });
/**
 * FOi criado uma rota do tipo get(para listagem de coisas)
 * passando a rota /ongs 
 * realizando connection na tabela ongs
 * selecionando todos os campos de todos os registros dentro da tabela ong.
 */

 //Como estamos criando uma sessão, utiliza-se o método post.
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.create);

/**
 * Query
 * Route --- Parâmetros
 * Body
 */

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create);

routes.get('/ongs', OngController.index);

routes.post('/incidents', celebrate({

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),

  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
}), IncidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentController.index);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),

  }).unknown(),
}), ProfileController.index);

//Criando uma rota para deletar um caso na tabela dentro do BD
//Rota do tipo delete, ela vai ser /incidents, mas precisa-se saber
//qual incidente a ong quer deletar, então para isso precisamos de um
//router param com o ID do incidente que ela quer deletar.
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete);


//Criando a primeira rota da aplicação (rota principal/raiz)
//E em seguida separado por virgula, uma função será recebida como segundo parametro.

//app.get = significa que a rota é acessivel através do método get
/*

Métodos HTTP:
Get: Buscar/listar Informação no Back-end
Post: Criar uma informação no Back-end (criar um novo user por ex)
Put: Alterar uma informação no back-end
Delete: Deletar uma informação no back end
*/

/**
 * Tipos de parâmetros:
 * Query Params: São parametros enviados dentro da url, parâmetros nomeados enviados na rota
 * após o símbolo de interrogação e geralmente servem para filtros, paginacao
 * dá pra anexar com &
 * 
 * Route Params: Parametros utilziados para identificar recursos (id por ex)
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos 
 *  Ex: Um usuario com nome, email, etc, para isso é utilziado o metodo post.
 *  Criar usuario -> Troca pro metodo post
 *  No body muda para o formato json.
 *  Alterar de params para body
 * 
 */

 /**
  * Alternativas de Bancos de dados
  * Bancos de dados SQL: MySQL, SQListe, PostgreSQL, Oracle, Microsoft SQL server
  * SQL = é o formato que é utilizado para se comunicar com o banco de dados.
  * 
  * NoSQL = MongoDB, CouchDB, etc.
  * 
  */

 //routes.post('/ongs', async (request, response) => {

  //const params = request.query;
  //const params = request.params;
  //Todas as informações da ong estão armazenadas na variavel data, porém é melhor realizar a desestruturação
  //const data = request.body;

  //Desestruturação para pegar cada dado em uma variável separada
  //Assim é garantido que o usuário não vá mandar uma variavel que o desenvolvedor não
  //quer que ele preencha
  //const { name, email, whatsapp, city, uf} = request.body;

  //Gerando ID para a ong
  //const id = crypto.randomBytes(4).toString('HEX');
  /**
   * Ele vai gerar 4 bytes de caracteres aleatorios
   * e em seguida foi convertido para uma string de hexadecimal
   * ou seja, ele vai gerar 4 bytes de caractres hexadecimais e vai gerar
   * um ID
   */

   /*await connection('ongs').insert({

    id,
    name, 
    email,
    whatsapp,
    city,
    uf,

   });*/
   /**
    * Realizando as operações com o banco de dados
    * Foi utilizado o connection como parametro passando o nome da tabela
    * que será inserido dados e depois é utilizado o método insert para inserir dados
    * dentro da tabela. (colunas por ex.)
    * O await informa para o node que quando ele chegar na parte do codigo com await
    * ele vai aguardar o codigo finalizar para entar ele finalizar
    */

  //console.log(data);

  //Retornando uma reposta/response ao navegador/cliente
  //return response.send('Hello World');

  //Retornando uma resposta no formato de json para o cliente
  //Geralmente é enviado objeto dentro das chaves

  //return response.json({ id });

//});

//A função em questão sempre recebe dois parametros (request e response)

//Exportando as rotas daqui para o arquivo index:
module.exports = routes;