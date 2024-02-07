import * as selfController from '../controller/self-controller.js';
import express from "express";

const router = express.Router();

router.post("/", selfController.createUser);
// TODO: When executing the below routers, add authentication layer
router.get("/", selfController.fetchUser);
router.put("/", selfController.updateUser);

export default router;