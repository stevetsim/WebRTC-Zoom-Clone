// Import the Libraries
const moment = require('moment')
const dotenv = require('dotenv')
const socket = require('socket.io')
const root = require('app-root-path')
const logger = require(`${root}/utils/logger`).getLogger('Socket')
dotenv.config()

module.exports = {
  init: (http, app) => {
    // Import Socket.io Module
    const io = socket(http)

    // Listeners
    io.on('connection', (socket) => {
      const client_ip = socket.handshake.headers['x-forwarded-for']
      logger.info(`Client(IP: ${client_ip}, Socket ID: #${socket.id}) connected`)

      // Remove User Session once they disconnected from server
      socket.on('disconnect', () => {
        logger.info(`Client(IP: ${client_ip}, Socket ID: #${socket.id}) disconnected`)
      })
    })
  }
}
