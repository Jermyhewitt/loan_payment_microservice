const express = require('express');
const LoanService = require('../services/loanService');
const router = express.Router()
const {reqToLoan} = require('../models/loanMapper')


router.post('/',express.json(),async (req, res) => {
    
    let loanService = new LoanService();
    let loan = reqToLoan(req.body)
    let newLoan = await loanService.saveLoan(loan);
    res.status(201).json(newLoan);
})

router.get('/', async (req, res) => {
    let loanService = new LoanService();
    let loans = await loanService.getAll();
    res.json(loans)
})

router.get('/:id', async (req, res) => {
    let loanService = new LoanService();
    let loan = await loanService.getLoanById(req.params.id);
    res.json(loan)
})


module.exports = router;
