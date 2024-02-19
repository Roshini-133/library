import express from "express";
import { studbook,returnBooks } from "../controller/booktakenHandler";
const router = express.Router();

router.post("/studbook", studbook);
router.put("/returnBooks", returnBooks);
export default router;
