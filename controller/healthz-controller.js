import { authPostgres } from '../authenticate/auth.js'
import { setErrorResponse} from './response-handler.js'
import { getLogger } from './../logger/logging.js';

const logger = getLogger();

export const getHealthz = async (request, response) => {
    try {
        logger.debug('getHealthz is being processed')

        if (Object.keys(request.body).length !== 0) {
            logger.error('Provided request for Healthz API is invalid')
            setErrorResponse('400', response);
            return;
        } else {
            await authPostgres(response);
            logger.info('Connecting to sequelize database')
        }
    } catch {
        logger.error('Internal Service Error. Try again after sometime')
        setErrorResponse('500', response);
    }
};
