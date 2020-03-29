
exports.up = function(knex) {

  //Método UP é responsável pela criação da tabela

  return knex.schema.createTable('incidents', function(table) {

    //Criando campos

    //Campo primário
    table.increments(); //ID Número, o increments vai criar uma chave primaria autoincrement
    //cade vez que um incidente for criado o numero será incrementado 

    //NotNullable campo que não pode ser vazio
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
  
    //Criar coluna para armazenar a ong que criou determiando incidente (relacionamento no bd)
    table.string('ong_id').notNullable();

    /**
     * Criação da chave estrangeira abaixo
     * Explanation: Toda vez que a ong_id estiver preenchida ele precisa ser um
     * id que esteja cadastrado dentro da tabela ong(vide create_ongs).
     */

     table.foreign('ong_id').references('id').inTable('ongs');
     /**
      * 1 - Informar a coluna (ong_id)
      * 2 - Referenciar a coluna 'id'
      * 3 - Na tabale 'ongs'
      * Ou seja, a coluna ong_id criada logo acima referencia a coluna id dentro
      * da tabela ongs
      */

  });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};

//Detalhe: voltar atrás npx knex migrate:rollback, listar migrations: npx knex migrate:status
