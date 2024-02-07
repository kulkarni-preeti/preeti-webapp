import { authPostgres } from '../authenticate/auth.js'
import { setErrorResponse} from './response-handler.js'

export const getHealthz = async (request, response) => {
    try {
        if (Object.keys(request.body).length !== 0) {
            setErrorResponse('400', response);
            return;
        } else {
            await authPostgres(response);
        }
    } catch {
        setErrorResponse('500', response);
    }
};
