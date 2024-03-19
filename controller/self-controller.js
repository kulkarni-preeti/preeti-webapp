import { setErrorResponse, setResponse} from './response-handler.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sequelize } from '../authenticate/auth.js';
import User from '../model/user-model.js';
import * as userService from "../services/user-service.js";
const ignorePostFields = ['account_created', 'account_updated'];
import { getLogger } from './../logger/logging.js';

const logger = getLogger();

export const createUser = async (request, response) => {
    try {
        await sequelize.authenticate();
        response.header('Cache-Control', 'no-cache');  // https://www.rfc-editor.org/rfc/rfc9111#section-5.2
        
        const userDetails = request.body;
        ignorePostFields.forEach(field => delete userDetails[field]);
        if (!userService.isValidReq(userDetails) || (Object.keys(request.query).length > 0) || !(userService.isValidPostBody(userDetails))) {
            logger.error('Provided request is invalid', {severity: "error", userDetails : userDetails, status: "error"})
            setErrorResponse('400', response);
            logger.error('Provided email is invalid', {severity: "error", email : userDetails.username, status: "error"})
            setErrorResponse('400', response, "Invalid username, not an email.");
        } else {
            const existingUser = await User.findOne({ where: { username: userDetails.username}});
            if (existingUser == null) {
                logger.info('User is unique. Creating user', {severity: "info", User: userDetails.username});
                const newUser = {
                    id : uuidv4(),  // https://www.geeksforgeeks.org/how-to-create-a-guid-uuid-in-javascript/
                    first_name : userDetails.first_name,
                    last_name : userDetails.last_name,
                    username : userDetails.username,
                    password : await bcrypt.hash(userDetails.password, 10)
                };
                await User.create(newUser);
                const createdUser = await User.findOne({ where: { username: newUser.username}});
                const getUser = {
                    id : createdUser.dataValues.id,
                    first_name : createdUser.dataValues.first_name,
                    last_name : createdUser.dataValues.last_name,
                    username : createdUser.dataValues.username,
                    account_created : createdUser.dataValues.account_created,
                    account_updated : createdUser.dataValues.account_updated
                }
                response.status(201).json(getUser);
                logger.info('User created successfully', {severity: "info", username: getUser.username, status: 'success' });
            } else {
                logger.warn('User exists and is not unique', {severity: "warn", username: userDetails.username, status: 'success' });
                setErrorResponse('400', response, "User already exists. Use a different username");
            }
        }
    } catch (error) {
        logger.error('Service Unavailable', {severity: "error", status: "error"})
        setErrorResponse('503', response);
    }
};

export const fetchUser = async (request, response) => {
    try {
        await sequelize.authenticate();
        response.header('Cache-Control', 'no-cache');  // https://www.rfc-editor.org/rfc/rfc9111#section-5.2
        const authorization = request.headers.authorization;
        if (!authorization || (Object.keys(request.query).length > 0) || (Object.keys(request.body).length > 0)) {
            logger.error('Provided Request is invalid', {severity: "error", status: "error"})
            setErrorResponse('400', response);
        } else {
            const encoded = authorization.substring(6);
            const decoded = Buffer.from(encoded, 'base64').toString('ascii');
            const [authEmail, authPassword] = decoded.split(':');
            const authenticatedUser = await User.findOne({ where: { username: authEmail}});
          
            if (!authenticatedUser) {
                logger.warn('User does not exist. Failed at authentication', {severity: "warn", username: authEmail, status: "success"})
                setErrorResponse('401', response, "User does not exist.");
            } else {
                const isValid = await bcrypt.compare(authPassword, authenticatedUser.dataValues.password);
                if (isValid) {
                    logger.info('User exists. Retrieving details', {severity: "info", username: authEmail, status: "success"})
                    const getUser = {
                        id : authenticatedUser.dataValues.id,
                        first_name : authenticatedUser.dataValues.first_name,
                        last_name : authenticatedUser.dataValues.last_name,
                        username : authenticatedUser.dataValues.username,
                        account_created : authenticatedUser.dataValues.account_created,
                        account_updated : authenticatedUser.dataValues.account_updated
                    }
                    response.status(200).json(getUser).send();
                    logger.info('User Details retrieved', {severity: "info", username: authEmail, status: "success"})
                } else {
                    logger.error('Invalid Login Credentials. Check username or password.', {severity: "error", status: "error"})
                    setErrorResponse('401', response, "Invalid Credentials");
                }
            }
        }
    } catch (error) {
        logger.error('Service Unavailable', {severity: "error", status: "error"})
        setErrorResponse('503', response);
    }
};

export const updateUser = async (request, response) => {
    try {
        await sequelize.authenticate();
        response.header('Cache-Control', 'no-cache');  // https://www.rfc-editor.org/rfc/rfc9111#section-5.2
        const authorization = request.headers.authorization;
        if (!authorization || (Object.keys(request.query).length > 0)) {
            logger.error('Provided Request is invalid', {severity: "error", status: "error"})
            setErrorResponse('400', response);
        } else {
            const encoded = authorization.substring(6);
            const decoded = Buffer.from(encoded, 'base64').toString('ascii');
            const [authEmail, authPassword] = decoded.split(':');
            const authenticatedUser = await User.findOne({ where: { username: authEmail}});
        
            if (!authenticatedUser) {
                logger.warn('User does not exist. Failed at authentication', {severity: "warn", username: authEmail, status: "success"})
                setErrorResponse('401', response, "User does not exist.");
            } else {
                const isValid = await bcrypt.compare(authPassword, authenticatedUser.dataValues.password);
                if (isValid) {
                    logger.info('User exists. Retrieving details', {severity: "info", username: authEmail, status: "success"})
                    const resBody = request.body;
                    if (!userService.isValidReq(resBody) || !(userService.isValidPutReq(resBody))) {
                        logger.error('Provided Request is invalid', {severity: "error", status: "error"})
                        setErrorResponse('400', response);
                    } else {
                        await User.update({
                            first_name : resBody.first_name,
                            last_name : resBody.last_name,
                            password : await bcrypt.hash(resBody.password, 10)
                        }, {
                            where : {
                                username : authEmail
                            }
                        })
                        setResponse('204', response);
                        logger.info('User Details edited', {severity: "info", username: authEmail, status: "success"})
                    }
                } else {
                    logger.error('Invalid Login Credentials. Check username or password.', {severity: "error", status: "error"})
                    setErrorResponse('401', response, "Invalid Credentials");
                }
            }
        }
    } catch (error) {
        logger.error('Service Unavailable', {severity: "error", status: "error"})
        setErrorResponse('503', response);
    }
};