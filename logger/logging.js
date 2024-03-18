import { createLogger, transports, format } from 'winston';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logFilePath = resolve(join(__dirname, '../tmp', 'webapp.log'));
const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: logFilePath })
  ]
});

export default logger;