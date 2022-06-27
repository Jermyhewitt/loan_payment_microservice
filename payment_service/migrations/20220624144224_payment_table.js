/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.hasTable('payments').then(function(exists) {
        if (!exists) {
            return knex.schema
            .createTable('payments', function (table) {
                table.increments('id');
                table.integer('loanId').notNullable();
                table.decimal('amount').notNullable();
                table.string('status', 255).notNullable();
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
    .dropTable("payments")
    
};
