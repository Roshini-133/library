import { StudentModel} from "../model";
import { Request, Response } from "express";


//add new student
const addstudent = async(req:Request,res:Response) =>{
  console.log("hi")

  const {rollno,name,department} = req.body
  try{
        await StudentModel.create({rollno,name,department})
        res.status(200).json({message:'success'})
  }
  catch(error){
          console.log(error)
          res.status(500).json({message:'Error occured in server'})
  }
}

//Retrieves all the available student
const getallstudents = async(req:Request,res:Response)=>{
  //const bookId = req.body
  try{
    
        const allstudents = await StudentModel.find()
        console.log(allstudents)
        res.status(200).json({message:'success',data : allstudents})
  }
  catch(error){
        console.log(error)
        res.status(500).json({message:'error occured'})
  }
}

//gets specific student
const getspecificstudent = async(req:Request,res:Response) =>{
  try{
  const stud :student= req.body 
  const specstudent = await StudentModel.find(stud)
  res.status(200).json({message:'success',data:specstudent})
}
catch(error)
{
  res.status(500).json({message:'error occured'})
}
}
 type student = {
  rollno ?: "number",
  department ? :"string"
 }

//update student name
const updatestudent = async(req:Request,res:Response)=>{
  try{
  const rollno = req.body.rollNo
  const upname = req.body.name
  await StudentModel.updateOne({rollNo:rollno},{$set:{name : upname}})
  
  res.status(200).json({message:'success'})}
  catch(error){
    res.status(500).json({message:'error occured'})
  }
}

//deletes student name
const deletestudent = async(req:Request,res:Response)=>{
  try{
    const rollno = req.body.rollNo
    await StudentModel.deleteOne({rollNo :rollno})
    res.status(200).json({message:'success'})
  }
  catch(error){
    res.status(500).json({message:'error occured'})
  }
}

export {
   addstudent,getallstudents,getspecificstudent,updatestudent,deletestudent
}


