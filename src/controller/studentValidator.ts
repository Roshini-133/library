import Joi from "joi";

type StudentDetails={
  rollNo : number,
  name:string,
  department : string
}
type UpdateStudentDetails={
  rollNo : number,
  name:string
}
type SpecificChangeInStudentDetails={
  rollNo:number
}

export function validateStudentDetailsDTO(data: StudentDetails) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    name: Joi.string().required(),
    department: Joi.string().required(),
  });
  return schema.validate(data);
}

export function validateSpecificStudentsDTO(data: SpecificChangeInStudentDetails) {
  const schema = Joi.object({
    rollNo: Joi.number().required()
    
  });
  return schema.validate(data);
}
export function validateUpdateStudentDTO(data: UpdateStudentDetails) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
    name: Joi.string().optional()
  });
  return schema.validate(data);
}
export function validateDeleteStudentDTO(data: SpecificChangeInStudentDetails) {
  const schema = Joi.object({
    rollNo: Joi.number().required(),
  });
  return schema.validate(data);
}

