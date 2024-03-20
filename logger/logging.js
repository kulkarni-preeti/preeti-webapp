import { createLogger, transports, format } from 'winston';

let loggerInstance = null;
let environmentType = '';

function initializeLogger() {
  let logTransport;
  if (process.env.NODE_ENV === 'test') {
    logTransport = new transports.Console();
  } else {
    logTransport = new transports.File({ filename: '/var/log/webapp/webapp.log' });
  }

  return createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [logTransport]
  });
}

export function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger(environmentType);
  }
  return loggerInstance;
}
