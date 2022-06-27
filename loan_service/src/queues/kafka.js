const { Kafka } = require('kafkajs')
require('dotenv').config();
const kafka = new Kafka({
  clientId: 'loan-service',
  brokers: JSON.parse(process.env.BROKERS),
});

module.exports = kafka;