const Model = require('./model');
module.exports = class PaymentModel extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'payments';
  }

  static get idColumn() {
    return 'id';
  }

  fromRequest



  static get jsonSchema() {
    return {
      type: 'object',
      required: ['loanId', 'amount'],

      properties: {
        id: { type: 'integer' },
        loanId: { type: 'integer'},
        amount: { type: 'number'},
        status: {type:'string'}
      }
    };
  }
}