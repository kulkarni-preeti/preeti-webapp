import { createLogger, transports, format } from 'winston';
import * as test from '../tests/create-account.test.js';

let envType = test.environmentType;
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