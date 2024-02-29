import express from "express";
import { addBookDetails, deletebook, getAllBookDetails, getspecificbook, updatebook } from "../controller/bookHandler";

const router = express.Router();

router.post("/",addBookDetails);
router.get("/:bookId", getspecificbook);
router.get("/",getAllBookDetails)
router.put("/:bookId",updatebook)
router.delete("/:bookId",deletebook)
export default router;































