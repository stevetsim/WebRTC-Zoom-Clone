const root = require('app-root-path')
const log4js = require('log4js')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'dateFile',
      filename: `${root}/logs/log`,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      keepFileExt: true,
      backups: 20
    }
  },
  categories: {
    default: { appenders: ['file', 'console'], level: 'trace' },
    Server: { appenders: ['file', 'console'], level: 'trace' },
    Socket: { appenders: ['file', 'console'], level: 'trace' },
    Peer: { appenders: ['file', 'console'], level: 'trace' }
  }
})

module.exports = log4js
