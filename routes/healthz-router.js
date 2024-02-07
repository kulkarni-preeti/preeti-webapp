import * as healthzController from '../controller/healthz-controller.js';
import express from "express";

const router = express.Router();

router.get("/", healthzController.getHealthz);

export default router;
