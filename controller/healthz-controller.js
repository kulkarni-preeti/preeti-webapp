import { authPostgres } from '../authenticate/auth.js'
import { setErrorResponse} from './response-handler.js'
import { getLogger } from './../logger/logging.js';

const logger = getLogger();

export const getHealthz = async (request, response) => {
    try {
        if (Object.keys(request.body).length !== 0) {
            logger.error('Provided request for Healthz API is invalid', {status: "error"})
            setErrorResponse('400', response);
            return;
        } else {
            await authPostgres(response);
            logger.info('Connecting to sequelize database', {status: "success"})
        }
    } catch {
        logger.error('Internal Service Error. Try again after sometime', {status: "error"})
        setErrorResponse('500', response);
    }
};
