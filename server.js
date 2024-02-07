import express from "express";
// import cors from "cors";
import registerRoute from "./routes/index.js";
import { User } from './model/user-model.js';

const PORT = 3000;
const app = express();

// app.use(cors()); // If request isn't coming from same domain, server will reject the requests
// app.use(bodyParser.text());
app.use(express.json()); // Converts JSON is req body to javascript object
app.use(express.urlencoded({ extended: true })); // If encoded URL is received, it will decode


registerRoute(app, User); //Initialize routes
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));