import { BookModel} from "../model";
import { Request, Response } from "express";


//add new book
const addbook = async(req:Request,res:Response) =>{
  //console.log("hi")

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
  //const bookId = req.body
  try{
    
        const allbooks = await BookModel.find()
        console.log(allbooks)
        res.status(200).json({message:'success',data : allbooks})
  }
  catch(error){
        console.log(error)
        res.status(500).json({message:'error occured'})
  }
}

//gets specific book
const getspecificbook = async(req:Request,res:Response) =>{
  try{
  const bookid :bookstype = req.body 
  const spebook = await BookModel.find(bookid)
  res.status(200).json({message:'success',data:spebook})
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


