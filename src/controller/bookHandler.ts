import { BookModel } from "../model";
import { Request, Response } from "express";
import {
  validateBookDetailsDTO,
  validateSpecificBookDTO,
  validateUpdateBookDTO,
  validateDeleteBookDTO,
} from "./booksValidator";
import {
  displayAllBooks,
  serverError,
  validatorError,
  alreadyExists,
  bookDetailsAdded,
  displaySpecificBookDetail,
  doesNotExists,
  updateSpecificBookDetail,
  deleteSpecificBookDetails
} from "./responseMessageForBookDetails";



//add new book
export const addBookDetails = async (req: Request, res: Response) => {
  try {
    const validationResult = validateBookDetailsDTO(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({
          statuscode: 400,
          error: validationResult.error,
          message: validatorError
        });
    }
    await BookModel.create(validationResult);
    res.status(201).json({ message: bookDetailsAdded ,statuscode:201});
  } catch (error) {
    if (error === 500) {
      res
        .status(500)
        .json({ statuscode: 500, message: serverError, error: error });
    } else if (error === 409) {
      res
        .status(409)
        .json({ statuscode: 409, message: alreadyExists, error: error });
    }
  }
};

//Retrieves all the available book
export const getAllBookDetails = async (req: Request, res: Response) => {
  try {
    const allbooks = await BookModel.find();
    res.status(200).json({ message: displayAllBooks, data: allbooks });
  } catch (error) {
    res
      .status(500)
      .json({ statuscode: 500, message: serverError, error: error });
  }
};

//gets specific book
export const getspecificbook = async (req: Request, res: Response) => {
  const validationResult = validateSpecificBookDTO(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult });
  }

  try {
    const specificBook = await BookModel.find(validationResult);
    res.status(200).json({ message: displaySpecificBookDetail, data: specificBook });
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

//update book name
export const updatebook = async (req: Request, res: Response) => {
  try{
  const validationResult = validateUpdateBookDTO(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult });
  }
    const bookid = req.body.bookId;
    const updateBookName = req.body.bookName;
    await BookModel.updateOne(
      { bookId: bookid },
      { $set: { bookName: updateBookName } }
    );

    res.status(200).json({ message: updateSpecificBookDetail , statuscode:200 });
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

export const deletebook = async (req: Request, res: Response) => {
  try {
  const validationResult = validateDeleteBookDTO(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult });
  }
    await BookModel.deleteOne({ bookId: validationResult });
    res.status(200).json({ message: deleteSpecificBookDetails });
  } catch (error) {
    if (error === 500) {
      res
        .status(500)
        .json({ statuscode: 500, message: serverError, error: error });
    } else if (error === 404) {
      res
        .status(404)
        .json({ statuscode: 404, message: doesNotExists, error: error });
    }  }
};
