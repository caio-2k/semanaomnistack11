const connection = require('../database/connection');

module.exports = {

  //Casos específicos de uma única ong
  async index (request, response){

    //Acessar os dados da ong que tá logada
    const ong_id = request.headers.authorization;

    //Buscar todos os incidentes
    const incidents = await connection('incidents')
    .where('ong_id', ong_id) //Buscando todos os incidentes criados pela ong
    .select('*');

    return response.json(incidents);
  }

};