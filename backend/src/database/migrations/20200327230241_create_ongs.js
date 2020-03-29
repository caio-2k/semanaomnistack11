
exports.up = function(knex) {

  //Método UP é responsável pela criação da tabela

  //criando tabela
  return knex.schema.createTable('ongs', function(table) {

    //Criando campos
    //Campo primário
    table.string('id').primary();
    
    //NotNullable campo que não pode ser vazio
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();

  });

};

exports.down = function(knex) {
  //Método Down para caso ocorra algum problema (deletar no caso)
  return knex.schema.dropTable('ongs');

};
