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
    const io = socket(http, {
      path: '/socket',
      cors: {
        credentials: true,
        origin: (null, true)
      }
    })

    // Listeners
    io.on('connection', (socket) => {
      const client_ip = socket.handshake.headers['x-forwarded-for']
      logger.info(`Client(IP: ${client_ip}, Socket ID: #${socket.id}) connected`)

      socket.on('join_room', (room_id, peer_id) => {
        socket.join(room_id)
        socket.to(room_id).emit('peer_connected', peer_id)
        logger.info(`Client(IP: ${client_ip}, Socket ID: #${socket.id}) has been joined room - ${room_id} with peer_id - ${peer_id}`)

        // Remove User Session once they disconnected from server
        socket.on('disconnect', () => {
          socket.to(room_id).emit('peer_disconnected', peer_id)
          logger.info(`Client(IP: ${client_ip}, Socket ID: #${socket.id}) with peer_id - ${peer_id} has been left room - ${room_id} `)
        })
      })
    })
  }
}
