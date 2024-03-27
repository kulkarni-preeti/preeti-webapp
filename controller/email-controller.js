import { setErrorResponse, setResponse} from './response-handler.js'
import { getLogger } from './../logger/logging.js';
import User from '../model/user-model.js';

const logger = getLogger();

export const verifyUser = async (request, response) => {
    try {
        logger.debug('validating whether the user has verified their email')
        const token = request.query.token;
        const userDetails = await User.findOne({
            where: {
                id: token
            }
        });
        if (!userDetails) {
            logger.error('Invalid URL');
            setErrorResponse('404', response, "Invalid URL");
            return;
        } else {
            const curr_dttm = Date.now();
            if (token === userDetails.dataValues.id && (curr_dttm < parseInt(userDetails.dataValues.expiration_dttm, 10))) {
                await User.update({ status: 'Active' }, {
                    where: {
                        username: userDetails.dataValues.username
                    }
                });
                logger.info('User authenticated. Account has been unlocked.')
                setResponse('200', response, "User has been unlocked"); 
        } else {
            logger.error('The link has expired and the account is locked')
            setErrorResponse('404', response, "Activation link has expired");
        }
    }
    } catch (e){
        console.log (e);
        logger.error('Internal Service Error. Try again after sometime')
        setErrorResponse('500', response);
    }
};
