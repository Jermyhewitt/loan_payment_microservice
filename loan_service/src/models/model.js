const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: 'loans.db'
  }
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = Model;