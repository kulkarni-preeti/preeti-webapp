import * as emailController from '../controller/email-controller.js';

import express from "express";

const router = express.Router();

router.get("/", emailController.verifyUser);

export default router;