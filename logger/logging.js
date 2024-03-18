import { createLogger, transports, format } from 'winston';
import * as test from '../tests/create-account.test.js';

let loggerInstance = null;

function initializeLogger(envType) {
  let logFileLoc;

  if (envType === 'test') {
    logFileLoc = './test-logging';
  } else {
    logFileLoc = '/var/logs/webapp.log';
  }

  return createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.File({ filename: logFileLoc })
    ]
  });
}

export function getLogger(envType) {
  if (!loggerInstance) {
    loggerInstance = initializeLogger(envType);
  }
  return loggerInstance;
}
