const kafka = require("./kafka")

module.exports = async function(topic,messages)
{
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({ topic, messages });
    await producer.disconnect();
}