import express from "express";
import { issuedBookDetails, returnBooks } from "../controller/booktakenHandler"
const router = express.Router();

router.post("/",issuedBookDetails );
router.put("/:rollNo/:bookId",returnBooks);

export default router;