import moment from 'moment'
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.printf((log) => {
    return `[${moment().format('MM/DD/YY, h:mm:ss a')}] ${log.level.toUpperCase()}: ${log.message}`
  }),
  transports: [new winston.transports.Console()],
})
