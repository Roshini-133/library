import express from "express";
import {   addStudentDetails,getAllStudents,getSpecificStudent,updateStudentDetails,deleteStudentDetails
} from "../controller/studentHandler"
const router = express.Router();

router.post("/", addStudentDetails);
router.get("/", getAllStudents);
router.get("/:rollNo",getSpecificStudent);
router.put("/:rollNo",updateStudentDetails);
router.delete("/:rollNo",deleteStudentDetails);

export default router;
