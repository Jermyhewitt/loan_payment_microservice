/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {

    knex.schema.hasTable('loans').then(function(exists) {
        if (!exists) {
            return knex.schema
            .createTable('loans', function (table) {
                table.increments('id');
                table.dateTime('dueDate').notNullable();
                table.decimal('principal').notNullable();
                table.decimal('payment').defaultTo(0);
            });
        }
      });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("loans")
    
};
