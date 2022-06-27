const express = require('express')
const kafka = require('./queues/kafka')
const app = express()
const port = 3001
const payments = require('./controllers/paymentController')
const startQueue = require('./queues/listeners');
startQueue()



app.use('/payments', payments);
app.use((req, res, next) => {
  res.status(404).json({message:"Sorry can't find that!"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})