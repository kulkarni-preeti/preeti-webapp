import healthzRouter from './healthz-router.js'
import userRouter from './self-router.js';
import { setErrorResponse } from '../controller/response-handler.js';
import { authPostgres } from '../authenticate/auth.js'
import { getLogger } from './../logger/logging.js';

const logger = getLogger();

const isGetMethod = (request, response, next) => {
    if ((request.method !== 'GET') || (Object.keys(request.query).length > 0)) {
        logger.error('Invalid request. Check Payload', {severity: "error", status: "error"})
        setErrorResponse('405', response);
        return;
    }
    next();
};

export default (app) => {
    app.use('/healthz', isGetMethod, healthzRouter);
    app.use('/vi/user', userRouter);
}