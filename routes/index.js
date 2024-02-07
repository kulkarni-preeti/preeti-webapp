import healthzRouter from './healthz-router.js'
import userRouter from './self-router.js';
import { setErrorResponse } from '../controller/response-handler.js';
import { authPostgres } from '../authenticate/auth.js'

const isGetMethod = (request, response, next) => {
    if (request.method !== 'GET') {
        setErrorResponse('405', response);
        return;
    }
    next();
};

export default (app) => {
    app.use('/healthz', isGetMethod, healthzRouter);
    app.use('/vi/user', userRouter);
}