const express = require('express')
const loanController = require('./controllers/loanController')
const app = express()
const port = 3000
const startQueue = require('./queues/listeners');
startQueue();


app.use('/loan', loanController)
app.use((req, res, next) => {
    res.status(404).json({message:"Sorry can't find that!"});
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})