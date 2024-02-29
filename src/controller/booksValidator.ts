import Joi from "joi";

type BookDetails={
  bookId : number,
  name:string,
  author : string,
  quantity : number
}
type BookDetailsUpdate={
  bookId : number,
  name:string
}
type SpecificChangeInBookDetails={
  bookId:number
}

export function validateBookDetailsDTO(data: BookDetails) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  return schema.validate(data);
}

export function validateSpecificBookDTO(data: SpecificChangeInBookDetails) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    
  });
  return schema.validate(data);
}
export function validateUpdateBookDTO(data: BookDetailsUpdate) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    bookName: Joi.string().optional()
  });
  return schema.validate(data);
}

export function validateDeleteBookDTO(data: SpecificChangeInBookDetails) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
  });
  return schema.validate(data);
}
