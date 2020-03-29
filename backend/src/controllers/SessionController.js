const connection = require ('../database/connection');

module.exports = {

  async create (request, response){

    //Validar o Login, verificar se a ong existe
    //Buscar o ID através do corpo da requisição
    const { id } = request.body;

    //Buscar ONG no banco de dados
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first()

    //Se a ong não existir
    if(!ong){

      return response.status(400).json({ error: 'No ONG found with this ID' });

    }

    return response.json(ong);

  }

};
