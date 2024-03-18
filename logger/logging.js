import { createLogger, transports, format } from 'winston';

let loggerInstance = null;
let environmentType = '';

function initializeLogger(envType) {
  let logFileLoc;

  if (envType === 'test') {
    logFileLoc = './test-logging';
  } else {
    logFileLoc = './test-logging';
  }

  return createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.File({ filename: logFileLoc })
    ]
  });
}

export function setEnvironmentType(type) {
  environmentType = type
}

export function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger(environmentType);
  }
  return loggerInstance;
}
