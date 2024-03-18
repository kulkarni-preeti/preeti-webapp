import { createLogger, transports, format } from 'winston';
import * as envType from '../tests/create-account.test.js';

if (envType === "testing") {
  logFileLoc = './test-logging'
} else {
  logFileLoc = '/var/logs/webapp.log'
}

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: logFileLoc })
  ]
});

export default logger;