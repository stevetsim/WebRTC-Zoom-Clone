// Import the Libraries
const { v4: uuidv4 } = require('uuid')
const root = require('app-root-path')
const logger = require(`${root}/utils/logger`).getLogger('Server')
const dotenv = require('dotenv')
dotenv.config()

// Import Web Server Module & Middleware
const express = require('express')
const app = express()
const http = require('http').createServer(app)
app.use(express.static(`${root}/web/client/dist`))

app.get('/connect', (req, res) => {
  const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  logger.info(`Client(IP: ${client_ip}) accessed /`)
  res.redirect(`/chat/${uuidv4()}`)
})

app.get('/chat/:room', (req, res) => {
  const room_id = req.params.room
  const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  logger.info(`Client(IP: ${client_ip}) accessed ${room_id}`)
  res.sendFile(`${root}/web/client/dist/index.html`)
})

module.exports = { http, app }
