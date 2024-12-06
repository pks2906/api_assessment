import express from "express";
import { verifyUser } from "../middleware/auth.middleware";
import {
  getTrains,
  bookSeat,
  getBookingDetails,
} from "../controller/user.controller";

const router = express.Router();

router.get("/trains", getTrains);
router.post("/book", verifyUser, bookSeat);
router.get("/booking/:id", verifyUser, getBookingDetails);

export default router;