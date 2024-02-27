import Joi from "joi";

export function validateBookDetailsDTO(data: any) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  return schema.validate(data);
}

export function validateSpecificBookDTO(data: any) {
  const schema = Joi.object({
    bookId: Joi.number().optional(),
    bookName: Joi.string().optional(),
    author: Joi.string().optional(),
  });
  return schema.validate(data);
}
export function validateUpdateBookDTO(data: any) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
    bookName: Joi.string().optional(),
    author: Joi.string().optional(),
  });
  return schema.validate(data);
}

export function validateDeleteBookDTO(data: any) {
  const schema = Joi.object({
    bookId: Joi.number().required(),
  });
  return schema.validate(data);
}
