const PaymentRepository = require("../repositories/paymentRepository")
const sendMessage = require("./sendMessage")
const kafka = require('./kafka');

module.exports = async function makePayment()
{
    const consumer = kafka.consumer({ groupId: 'payments-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'process-payment', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        let payment = JSON.parse(message.value);
        console.log(`processing payment ${payment.id}`)
        const processPayment = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('foo');
            }, 5000);
          });
        let processedPayment = {...payment,...{status:"completed"}}
        console.log(`saving payment ${payment.id}`)
        new PaymentRepository().update(processedPayment);
        console.log(`payment completed ${payment.id}`)
        await sendMessage("payment-completed",[{key:String(processedPayment.id),value:JSON.stringify(processedPayment)}]);
    },
    })
}
