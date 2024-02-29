import { StudentModel } from "../model";
import { Request, Response } from "express";
import {
  validateStudentDetailsDTO,
  validateSpecificStudentsDTO,
  validateUpdateStudentDTO,
  validateDeleteStudentDTO,
} from "./studentValidator";
import {
  doesNotExists,
  studentDetailsAdded,
  validatorError,
  alreadyExists,
  serverError,
  displayAllstudents,
  displaySpecificStudentDetail,
  deleteSpecificStudentDetails,
  updateSpecificStudentDetail,
} from "./responseMessageForStundent";
//add new student
export const addStudentDetails = async (req: Request, res: Response) => {
  try {
    const validationResult = validateStudentDetailsDTO(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        statuscode: 400,
        error: validationResult.error,
        message: validatorError,
      });
    }

    await StudentModel.create({ validationResult });
    res.status(201).json({ message: studentDetailsAdded, statuscode: 201 });
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

//Retrieves all the available student
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const allstudents = await StudentModel.find();
    console.log(allstudents);
    res.status(200).json({ message: displayAllstudents, data: allstudents });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ statuscode: 500, message: serverError, error: error });
  }
};

//gets specific student
export const getSpecificStudent = async (req: Request, res: Response) => {
  try {
    const validationResult = validateSpecificStudentsDTO(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult });
    }
    const specificStudentDetail = await StudentModel.find(validationResult);
    res.status(200).json({
      message: displaySpecificStudentDetail,
      data: specificStudentDetail,
      statuscode: 200,
    });
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

//update student name
export const updateStudentDetails = async (req: Request, res: Response) => {
  try {
  const validationResult = validateUpdateStudentDTO(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult });
  }
  
    const rollno = req.body.rollNo;
    const upname = req.body.name;
    await StudentModel.updateOne(
      { rollNo: rollno },
      { $set: { name: upname } }
    );

    res
      .status(200)
      .json({ message: updateSpecificStudentDetail, statuscode: 200 });
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

//deletes student name
export const deleteStudentDetails = async (req: Request, res: Response) => {
  const validationResult = validateDeleteStudentDTO(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult });
  }
  try {
    const rollno = req.body.rollNo;
    await StudentModel.deleteOne({ rollNo: rollno });
    res
      .status(200)
      .json({ message: deleteSpecificStudentDetails, statuscode: 200 });
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
