import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: '/var/logs/webapp.log' })
  ]
});

export default logger;