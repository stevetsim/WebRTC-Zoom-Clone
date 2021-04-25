// Import the Libraries
const root = require('app-root-path')
const logger = require(`${root}/utils/logger`).getLogger('Server')
const dotenv = require('dotenv')
dotenv.config()

// Import Web Server Module & Middleware
const express = require('express')
const app = express()
const http = require('http').createServer(app)

app.get('/', (req, res) => {
  const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  logger.info(`Client(IP: ${client_ip}) accessed /`)
  res.status(200).send('Zoom Clone Server is Running')
})

module.exports = { http, app }
