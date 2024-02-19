import { IssuebookModel, BookModel } from "../model";
import { Request, Response } from "express";

//to issue book to the particular student and prints error if there is no availability of book

const studbook = async (req: Request, res: Response) => {
  const details: bookstaken = req.body;
  const id = details.bookId;
  console.log(details);
  try {
    const book = await BookModel.findOne({ bookId: id });
    console.log(book);
    if (book && book.quantity > 0) {
      await IssuebookModel.create(details);
      await BookModel.updateOne(
        { bookId: id },
        { $set: { quantity: book.quantity - 1 } }
      );
      res.status(200).json({ message: "success" });
    } else {
      console.log("not enough quantity");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured in server" });
  }
};

type bookstaken = {
  rollno: number,
  bookId: number,
  issueDate: Date
};



// To return the book and know whether he/she has fine or not
const returnBooks = async(req: Request, res: Response)=>{
    const details: bookstaken = req.body;
    const issueDate = new Date(details.issueDate);
    const id = details.bookId;
    const currentDate = new Date();
    console.log(currentDate);
    console.log(issueDate);

    try{
        issueDate.setDate(issueDate.getDate() + 5)
        console.log(issueDate);
        if(currentDate > issueDate){
            console.log("pay rupees 10 fine")
            const book = await BookModel.findOne({ bookId: id });
            if (book && book.quantity > 0) {
                await BookModel.updateOne(
                  { bookId: id },
                  { $set: { quantity: book.quantity + 1  } }
                );

        
    }}else{
        console.log("you have no fine")
        const book = await BookModel.findOne({ bookId: id });
            if (book && book.quantity > 0) {
                await BookModel.updateOne(
                  { bookId: id },
                  { $set: { quantity: book.quantity + 1 } }
                );}
    }}catch(error){
        console.log(error);
        res.status(500).json({ message: "Error occured in server" });
    }
}


export { studbook ,returnBooks};
