import Joi from "joi";

function validateStudentDetailsDTO(data: any) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    name: Joi.string().required(),
    department: Joi.string().required(),
  });
  return schema.validate(data);
}

function validateSpecificStudentsDTO(data: any) {
  const schema = Joi.object({
    rollNo: Joi.number().optional(),
    name: Joi.string().optional(),
    department: Joi.string().optional(),
  });
  return schema.validate(data);
}
function validateUpdateStudentDTO(data: any) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    name: Joi.string().optional(),
    department: Joi.string().optional(),
  });
  return schema.validate(data);
}
function validateDeleteStudentDTO(data: any) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
  });
  return schema.validate(data);
}

export {
  validateStudentDetailsDTO,
  validateSpecificStudentsDTO,
  validateUpdateStudentDTO,
  validateDeleteStudentDTO,
};
