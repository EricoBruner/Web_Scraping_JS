const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.raw());

app.use(cors())

app.use(routes)

app.listen(3333, () => {
    console.log(' >>> Back-end esta no ar <<< ')
})  