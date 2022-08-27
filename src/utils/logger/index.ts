import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

import { AppConstants } from '../../constants/AppConstants';

const seqTransport = new SeqTransport({
  serverUrl: process.env.SEQ_SERVER_URL,
  apiKey: process.env.SEQ_API_KEY,
  onError: (error: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('SeqTransport error.', error);
    }
  },
  handleExceptions: true,
  handleRejections: true,
});

const loggerTransports = process.env.ENABLE_SEQ === 'true' ? [seqTransport] : [];

const logger = winston.createLogger({
  format: winston.format.combine(
    /* Isso é necessário para pegar logs de erros juntamente com as stack traces. https://github.com/winstonjs/winston/issues/1498 */
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    application: AppConstants.APPLICATION_NAME,
    vendor: process.env.VENDOR_NAME,
  },
  transports: loggerTransports,
});

/**
 * Se o ambiente não for o de produção os logs também irão para o `console` com o formato:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export { logger };
