import winston from 'winston'

import { AppConstants } from '../../constants/AppConstants'

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
  defaultMeta: {
    application: AppConstants.APPLICATION_NAME,
    vendor: process.env.VENDOR_NAME,
  },
})

/**
 * If not on production environment the logs 'll also be sent to console
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}

export { logger }
