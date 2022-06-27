const Model = require('./model');
module.exports = class extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'loans';
  }

  static get idColumn() {
    return 'id';
  }



  static get jsonSchema() {
    return {
      type: 'object',
      required: ['dueDate', 'principal'],

      properties: {
        id: { type: 'integer' },
        principal: { type: 'integer'},
        /*dueDate: {type: 'date-time'}, AJV version does 
        not support date-time. would need to add the formats plugin*/
        dueDate: {type: 'string'},
        payment:{type: 'number'}
      }
    };
  }
}