const { Kafka } = require('kafkajs')
require('dotenv').config();
const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: JSON.parse(process.env.BROKERS),
});

module.exports = kafka;