import express from "express";
// import cors from "cors";
import registerRoute from "./routes/index.js";
import { User } from './model/user-model.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


registerRoute(app, User);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

export {app}