const express = require('express')

const AcessControl = require('./controllers/AcessControl')

const routes = express.Router()

routes.post('/default-setting', AcessControl.defaultSetting)

module.exports = routes