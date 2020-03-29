const connection = require ('../database/connection');

module.exports = {

  async create(request, response){
    //Realizando desestruturação para cadastrar um incidente, passando os dados
    const {title, description, value} = request.body;

    /**
     * Acessar cabeçalho da requisião
     * O cabeçalho da requisição guarda informação do contexto da requisição
     * e gerealmente vem dados da autenticação do usuario, localização (linguagem)
     * e etc...
     */

     //Acessando o ID da ong
     const ong_id = request.headers.authorization;

     const [id] = await connection('incidents').insert({

      title,
      description,
      value,
      ong_id,

     });

     return response.json({ id });

      /**
      * Await connection na tabela incidents
      * eu vou inserir os dados inseridos
      * Para retornar o ID gerado a partir do cadastro do incidente
      * é possível pegar o ID retornando um resultado (result)
      * E como foi feito a insersão de um unico registro (titulo, descrição...)
      * o result sera um array com uma unica posição, com um unico ID
      * para pegar o id posso fazer const id = result [0] (dps da funcao);
      * mas ainda posso desestruturar e pra pegar o primeiro coloco o ID em 
      * colchetes
      */

  },

  async index (request, response) {
    //Fazendo a paginação
    const { page = 1 } = request.query;
    const incidents = await connection('incidents')
    .join('ongs', 'ong_id', '=', 'incidents.ong_id')
    //join serve para relacionar dados de duas tabelas, ou seja, ao inves de listar
    //apenas os casos, sera listado todos os dados da ong.
    //junto com os incidentes eu trago dado da tabela de ongs(1), eu trago dados onde apenas o
    //id presente na tabela de ongs(2) seja igual (3) ao id da ong.
    .limit(5)
    .offset((page - 1) * 5)
    .select([ //Selecionando apenas oque eu quero, transformando em um array
    'incidents.*', 
    'ongs.name', 
    'ongs.email', 
    'ongs.whatsapp',
    'ongs.city', 
    'ongs.uf'
    ]);
    /**  
     * Foi buscado de dentro do request.query o parametro page, caso ele não exista
     * é utilizado por padrao o valor de 1, antes do select foi limitado os dados que 
     * a busca no banco de dados vai fazer para 5 registros, e após isso  é pulado 5 registros por paginas
     * porém na pagina 1 é necessári pular 0.
     * A gente pega page -1 *5, então na primeira pagina, vai ter valor 0 vezes 5 vai começar ap aritr
     * do 0 e vai pegar os proximos registros, ján a segunda pagina ele vai fazer 2 - 1 = 1, vezes 5 = 5
     * então ele vai pegar pualando os 5 primeiros registros os proximos 5
     */

    //Retornando a quantidade de casos
    //tá entre colchetes pois quero somente a primeira posição do array
    // ou count[0]
    const [count] = await connection('incidents')
    .count();

    //console.log(count);

    //Retornando o numero de registros atraves do cabeçalho da resposta da
    //requisição
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async delete (request, response){

    //Pegar ID que vem do request.params que é o paramatro de rota
    //E também pegar o ID da ong logada, buscar o ID da ong atraves do header

    const { id } = request.params;
    const ong_id = request.headers.authorization;

    //Verificar se o incidente solicitado para delete realmente foi criado
    //pela ong que tá querendo deletar ele

    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();
    /**
     * Foi buscado um incidente dentro da tabela incidents
     * E como foi necessario buscar por um incidente especifico, utilizamos o
     * where onde o id for igual ao id.
     * E então vai ser selecionado apenas a coluna ong_id select
     * E como vai ser retornado apenas um registro, só 1 incidnete com o ID
     * podemos uitlizar o .first que irá rtornar apenas 1 resultado
     */

    if(incident.ong_id != ong_id){
      return response.status(401).json({ error: 'Operation not permitted.' })
    }
    /**
     * Verificação - Se o ong id do incidente bucado no banco de dados for diferente
     * do ong id que esta logado na aplicação um erro será retornado utilizando
     * status, alterando o status do codigo http (padrao 200) para 401
     * no formato json para enviar uma resposta no formato json com um error dentro
     */

    await connection('incidents').where('id', id).delete();
    /**
     * await connection na tabela incidents buscando pelo id
     */

    return response.status(204).send();
    //Aqui é quando retorna uma resposta pro front-end que não tem conteudo
    //No content, e o send é pra enviar a resposta sem corpo nenhum.

  }

};