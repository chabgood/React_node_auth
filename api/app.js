const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/users', require('./routes/users'))
app.listen(port)
console.log(`server listening on port ${port}`)

module.exports = app
