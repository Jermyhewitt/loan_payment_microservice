PaymentModel = require('../models/paymentModel')
module.exports = class PaymentRepository {

    async create(payment)
    {
        return  PaymentModel.query().insertAndFetch(payment);
    }

    async update(payment)
    {
        return  PaymentModel.query().findById(payment.id).patch(payment);
    }

    async findAll()
    {
        return PaymentModel.query();
    }

    async findById(id)
    {
        return  PaymentModel.query().findById(id)
    }
    
    async delete(id)
    {
        return  PaymentModel.query().deleteById(id)
    }

  }