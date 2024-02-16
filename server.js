import express from "express";
// import cors from "cors";
import registerRoute from "./routes/index.js";
import User from './model/user-model.js';
import { sequelize } from "./authenticate/auth.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


registerRoute(app, User);
sequelize.sync({ force: false , alter : true}).then(() => {
    console.log('Model synchronized with database');
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

export {app}