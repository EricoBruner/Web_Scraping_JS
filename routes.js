const express = require('express')

const AcessControl = require('./controllers/AcessControl')

const routes = express.Router()

routes.post('/default-setting', AcessControl.defaultSetting)
routes.post('/view-setting', AcessControl.viewSetting)

module.exports = routes