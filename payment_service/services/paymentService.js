const PaymentModel = require("../models/paymentModel");
const sendMessage = require("../queues/sendMessage");
const PaymentRepository = require("../repositories/paymentRepository");


module.exports = class PaymentService {
    constructor()
    {
       this.paymentRepository = new PaymentRepository();
    }
    
    async schedulePayment(payments)
    {
        return sendMessage("process-payment",payments);
    }

    async savePayment(payment)
    {
         return this.paymentRepository.create(payment);
    }

    async getAllPayments()
    {
        return this.paymentRepository.findAll();
    }

    async getLoanPayments(id)
    {
        return PaymentModel.query().where("loanId",id);
    }
  }
  