import { createLogger, transports, format } from 'winston';

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

export function setEnvironmentType(type) {
  environmentType = type;
}

export function getLogger() {
  if (!loggerInstance) {
    loggerInstance = initializeLogger();
  }
  return loggerInstance;
}
