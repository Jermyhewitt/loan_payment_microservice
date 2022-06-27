const LoanService = require('../services/loanService')
const kafka = require('./kafka')
module.exports = async function makePayment()
{
    const consumer = kafka.consumer({ groupId: 'loan-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'payment-completed', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            key: message.key.toString(),
            value: message.value.toString(),
            headers: message.headers,
        })
        let payment = JSON.parse(message.value.toString());
        new LoanService().addPayment(payment);
    },
    })
}