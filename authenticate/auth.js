
import { setResponse, setErrorResponse } from "../controller/response-handler.js";
import { Sequelize } from "sequelize";

//TODO: Check if we really need to set 200 success response here.
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export const authPostgres = async (response) => {
    try {
        await sequelize.authenticate();
        response.header('Cache-Control', 'no-cache');  // https://www.rfc-editor.org/rfc/rfc9111#section-5.2
        setResponse('200', response);
    } catch (error) {
        setErrorResponse('503', response);
    }
}