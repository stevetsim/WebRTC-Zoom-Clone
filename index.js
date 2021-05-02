// Import the Libraries
const logger = require('./utils/logger').getLogger('Server')
const dotenv = require('dotenv')
dotenv.config()

// Import WebServer, Socket Server and Peer Server Module
const { http, app } = require('./servers/express')
const socket = require('./servers/socket')
const peer = require('./servers/peer')
socket.init(http, app)
peer.init(http, app)

// Start Server
http.listen(process.env.PORT, () => {
  logger.debug(`Socket Server Started with Port ${process.env.PORT}`)
})
