import express from "express";
// import cors from "cors";
import registerRoute from "./routes/index.js";
import User from './model/user-model.js';
import { sequelize } from "./authenticate/auth.js";


async function dbInit () {
    await sequelize.sync({ force: false , alter : true}).then(() => {
        console.log('Model synchronized with database');
    })
};

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


registerRoute(app, User);
dbInit();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

export {app}