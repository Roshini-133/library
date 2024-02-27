import { BookModel} from "../model";
import { Request, Response } from "express";
import {validateBookDetailsDTO,validateSpecificBookDTO,validateUpdateBookDTO,validateDeleteBookDTO} from "./booksValidator"

//add new book
const addbook = async(req:Request,res:Response) =>{
  const validationResult = validateBookDetailsDTO(req.body);
  if(validationResult.error){
    return res.status(400).json({message:validationResult})
  }
  const {bookId,bookName,author,quantity} = req.body
  

  try{
        await BookModel.create({bookId,bookName,author,quantity})
        res.status(200).json({message:'success'})
  }
  catch(error){
          console.log(error)
          res.status(500).json({message:'Error occured in server'})
  }
}

//Retrieves all the available book
const getbook = async(req:Request,res:Response)=>{
  try{
    
        const allbooks = await BookModel.find()
        res.status(200).json({message:'success',data : allbooks})
  }
  catch(error){
        console.log(error)
        res.status(500).json({message:'error occured'})
  }
}

//gets specific book
const getspecificbook = async(req:Request,res:Response) =>{
  const data :bookstype = req.body 
  const validationResult = validateSpecificBookDTO(req.body);
  if(validationResult.error){
    return res.status(400).json({message:validationResult})
  }

  try{
  const specificBook = await BookModel.find(data)
  res.status(200).json({message:'success',data:specificBook})
}
catch(error)
{
  res.status(500).json({message:'error occured'})
}
}
type bookstype ={
  bookid ?: "number",
  bookname?:"string",
  author ?:"string",
}

//update book name
const updatebook = async(req:Request,res:Response)=>{
  const validationResult = validateUpdateBookDTO(req.body);
  if(validationResult.error){
    return res.status(400).json({message:validationResult})
  }
  try{
  const bookid = req.body.bookId
  const upname = req.body.bookName
  await BookModel.updateOne({bookId:bookid},{$set:{bookName : upname}})
  
  res.status(200).json({message:'success'})}
  catch(error){
    res.status(500).json({message:'error occured'})
  }
}

const deletebook = async(req:Request,res:Response)=>{
  const validationResult = validateDeleteBookDTO(req.body);
  if(validationResult.error){
    return res.status(400).json({message:validationResult})
  }
  try{
    const bookid = req.body.bookId
    await BookModel.deleteOne({bookId :bookid})
    res.status(200).json({message:'success'})
  }
  catch(error){
    res.status(500).json({message:'error occured'})
  }
}

export {
   addbook,getbook,getspecificbook,updatebook,deletebook
}


