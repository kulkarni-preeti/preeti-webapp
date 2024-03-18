import { createLogger, transports, format } from 'winston';
import * as test from '../tests/create-account.test.js';

let loggerInstance = null;

function initializeLogger() {
  const envType = test.environmentType;
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

export function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger();
  }
  return loggerInstance;
}
