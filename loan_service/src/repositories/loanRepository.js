const LoanModel = require('../models/loanModel')
module.exports = class LoanRepository {

    async create(loan)
    {
        return LoanModel.query().insertAndFetch(loan);
    }

    async update(content)
    {
        return  LoanModel.query().findById(content.id).patch(content);
    }

    async findAll()
    {
        return  LoanModel.query()
    }

    async findById(id)
    {
        return  LoanModel.query().findById(id)
    }
    
    async delete(id)
    {
        return  LoanModel.query().deleteById(id)
    }

  }