const LoanRepository = require("../repositories/loanRepository");
const LoanModel = require('../models/loanModel');
const { raw } = require('objection');

module.exports = class LoanService {
    constructor()
    {
       this.loanRepository = new LoanRepository();
    }
    
    async saveLoan(loan)
    {
         return this.loanRepository.create(loan);
    }

    async getAll()
    {
        return this.loanRepository.findAll(); 
    }
    async addPayment(payment)
    {
        return LoanModel.query().findById(payment.loanId).patch({payment: raw('payment + ?',payment.amount)})
    }

    async getLoanById(id)
    {
        return this.loanRepository.findById(id);
    }
  }
  