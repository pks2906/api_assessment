import express from "express";
import { verifyAdmin } from "../middleware/auth.middleware";
import { addTrain } from "../controller/admin.controller";

const router = express.Router();

router.post("/train", verifyAdmin, addTrain);

export default router;