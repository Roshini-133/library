import express from "express";
import {   addstudent,getallstudents,getspecificstudent,updatestudent,deletestudent
} from "../controller/studentHandler"
const router = express.Router();

router.post("/addstudent", addstudent);
router.get("/getallstudents", getallstudents);
router.get("/getspecificstudent",getspecificstudent);
router.put("/updatestudent",updatestudent);
router.delete("/deletestudent",deletestudent);

export default router;
