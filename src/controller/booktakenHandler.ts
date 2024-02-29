import { IssuebookModel, BookModel } from "../model";
import { Request, Response } from "express";
import { validateIssueBookDTO } from "./booksTakenValidator";
import {
  issueSpecificBook,
  notEnoughQuantity,
  serverError,
  doesNotExists,
  quantityUpdated
} from "./responseMessageForBookDetails";
import { error } from "console";
//to issue book to the particular student and prints error if there is no availability of book
type BookTaken = {
  rollNo: number;
  bookId: number;
  issueDate: Date;
  rentalDays:number;
};
type ReturnBook = {
  rollNo: number;
  bookId: number;
}


export const issuedBookDetails = async (req: Request, res: Response) => {
  try {
    const validationResult = validateIssueBookDTO(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error });
    }
    const bookDetails: BookTaken = req.body;
    const bookId = bookDetails.bookId;
    const rollNo = bookDetails.rollNo
    const issueDate = bookDetails.issueDate
    const rentalDays = bookDetails.rentalDays
    const combinedId = `${rollNo}_${bookId}`;
    const book = await BookModel.findOne({ bookId: bookId });
    if (book && book.quantity > 0) {
      await IssuebookModel.create({
        combinedId,
        issueDate,
        rentalDays
        });
      await BookModel.updateOne(
        { bookId: bookId },
        { $set: { quantity: book.quantity - 1 } }
      );
      res
        .status(200)
        .json({ message: issueSpecificBook, statuscode: 200});
    } else {
      res
        .status(404)
        .json({ message: notEnoughQuantity, statuscode: 404, error: error });
    }
  } catch (error) {
    if (error === 500) {
      res
        .status(500)
        .json({ statuscode: 500, message: serverError, error: error });
    } else if (error === 404) {
      res
        .status(404)
        .json({ statuscode: 404, message: doesNotExists, error: error });
    }
  }
};

// To return the book and know whether he/she has fine or not
export const returnBooks = async (req: Request, res: Response) => {
  try {
  const validationResult = validateIssueBookDTO(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult });
  }
  const bookDetails: ReturnBook = req.body;
  const bookId = bookDetails.bookId;
    const rollNo = bookDetails.rollNo
    const combinedId = `${rollNo}_${bookId}`
    const issuedBookDetail = await IssuebookModel.findOne({combinedId})
  if(issuedBookDetail){
    const issueDate = new Date(issuedBookDetail.issueDate);
    issueDate.setDate(issueDate.getDate() + +(issuedBookDetail.rentalDays))
    const currentDate = new Date();
        // issueDate.setDate(issueDate.getDate() + 5)
        if(currentDate > issueDate){
            console.log("pay rupees 10 fine")
            const book = await BookModel.findOne({ bookId: bookDetails.bookId });
            if (book && book.quantity > 0) {
                await BookModel.updateOne(
                  { bookId: bookId },
                  { $set: { quantity: book.quantity + 1  } }
                );
                res
                .status(200)
                .json({ message: quantityUpdated, statuscode: 200 });

    }}else{
        console.log("you have no fine")
        const book = await BookModel.findOne({ bookId: bookId });
            if (book && book.quantity > 0) {
                await BookModel.updateOne(
                  { bookId: bookId },
                  { $set: { quantity: book.quantity + 1 } }
                );

              }
    }}
  else{
    res
        .status(404)
        .json({ statuscode: 404, message: doesNotExists, error: error });
  }}
   catch (error) {
    if (error === 500) {
      res
        .status(500)
        .json({ statuscode: 500, message: serverError, error: error });
    } else if (error === 404) {
      res
        .status(404)
        .json({ statuscode: 404, message: doesNotExists, error: error });
    }
  }
};


