
import { setResponse, setErrorResponse } from "../controller/response-handler.js";
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import { getLogger } from './../logger/logging.js';

const logger = getLogger();

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
});

export const authPostgres = async (response) => {
    try {
        logger.debug('authPostgres is being processed', {severity: "debug"})
        await sequelize.authenticate();
        response.header('Cache-Control', 'no-cache');  // https://www.rfc-editor.org/rfc/rfc9111#section-5.2
        logger.info('Successfully connected to the database', {severity: "info"})
        setResponse('200', response);
    } catch (error) {
        logger.error('Unable to connect to database', {severity: "info"})
        setErrorResponse('503', response);
    }
}