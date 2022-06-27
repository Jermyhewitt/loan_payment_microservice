const express = require('express');
const { reqToPayment } = require('../models/paymentMapper');
const request = require('../request');
const PaymentService = require('../services/paymentService');
const router = express.Router()
require('dotenv').config();


router.post('/:id',express.json(),async (req, res) => {
    let response = await request.get(`${process.env.LOAN_URL}/loan/${req.params.id}`,3);
    let loan = await response.json();
    console.log(`loan retrieved ${JSON.stringify(loan)}`);
    if(response.status==404)
    {
        return res.status(404).json({message:"Loan does not exist"});
    }
    let paymentService = new PaymentService();
    let payment = reqToPayment(req.body);
    console.log(`Saving payment`);
    const savedPayment = await paymentService.savePayment({...payment,...{status:"pending"}});
    console.log(`Sending payment to queue ${savedPayment.id}`);
    await paymentService.schedulePayment([{key:`${savedPayment.loanId}`,value:JSON.stringify(savedPayment)}]);
    
    res.append("Retry-After",3);
    res.location(`${process.env.PAYMENT_URL}/payment/loan/${req.params.id}/status`);
    res.status(202).json({message:"payment scheduled for processing"})
})

router.get('/', async (req, res) => {
    let paymentService = new PaymentService();
    let payments = await paymentService.getAllPayments()
    res.json(payments);
})

router.get('/loan/:loanId', async (req, res) => {
    let paymentService = new PaymentService();
    let payments = await paymentService.getLoanPayments(req.params.id);
    res.json(payments);
})


module.exports = router;
