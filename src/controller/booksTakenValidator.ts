import Joi from "joi";

function validateIssueBookDTO(data: any) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    bookId: Joi.number().required(),
    date: Joi.date().required(),
  });
  return schema.validate(data);
}


export{
    validateIssueBookDTO,
}