import Joi from "joi";

type BookTaken = {
  rollNo: number,
  bookId: number,
  issueDate: Date,
  rentalDays:number
};
type ReturnBook = {
  rollno: number,
  bookId: number
};

export function validateIssueBookDTO(data: BookTaken) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    bookId: Joi.number().required(),
    issueDate: Joi.date().required(),
    rentalDays:Joi.number().required()

  });
  return schema.validate(data);
}
export function validateReturnBookDTO(data: ReturnBook) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    bookId: Joi.number().required()
  });
  return schema.validate(data);
}


