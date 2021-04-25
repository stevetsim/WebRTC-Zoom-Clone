// Import the Libraries
const moment = require('moment')
const dotenv = require('dotenv')
const root = require('app-root-path')
const { ExpressPeerServer } = require('peer')
const logger = require(`${root}/utils/logger`).getLogger('Peer')
dotenv.config()

module.exports = {
  init: (http, app) => {
    const peer_server = ExpressPeerServer(http, { path: '/rtc' })
    peer_server.on('connection', (client) => {
      console.log(client)
    })

    peer_server.on('disconnect', (client) => {
      console.log(client)
    })

    app.use('/peer', peer_server)
  }
}
