import express from "express";
import {addbook,getbook,getspecificbook,updatebook,deletebook} from "../controller/bookHandler"
const router = express.Router();

router.post("/addbook", addbook);
router.get("/getbook", getbook);
router.get("/getspecificbook",getspecificbook);
router.put("/updatebook",updatebook);
router.delete("/deletebook",deletebook);

export default router;
