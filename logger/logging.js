import { createLogger, transports, format } from 'winston';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv');

dotenv.config();

let loggerInstance = null;
let environmentType = '';

function initializeLogger() {
  let logTransport;
  let logFormat;

  if (process.env.NODE_ENV === 'test') {
    logTransport = new transports.Console();
    logFormat = format.json();
  } else {
    logTransport = new transports.File({ filename: '/var/log/webapp/webapp.log' });
    logFormat = format.combine(
      format.timestamp(),
      format.json()
    );
  }

  return createLogger({
    level: 'debug',
    format: logFormat,
    transports: [logTransport]
  });
}

export function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger(environmentType);
  }
  return loggerInstance;
}
