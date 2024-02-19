// import mongoose, { Document, Schema } from "mongoose";

// const bookDetails = new Schema({
//   books: [
//     {
//       bookId: { type: Number, required: true, unique: true },
//       name: { type: String, required: true },
//       author: { type: String, required: true },
//       quantity: { type: String, required: true },
//     },
//   ],
// });

// const studentDetails = new Schema({
//   students: [
//     {
//       rollNo: { type: Number, required: true, unique: true },
//       name: { type: String, required: true },
//       department: { type: String, required: true },
//     },
//   ],
// });

// const admin = new Schema({
//   name: { type: Number, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const issueBook = new Schema({
//   rollNo: { type: Number, required: true, unique: true },
//   bookId: { type: Number, required: true, unique: true },
//   issueDate: { type: String, required: true },
//   dueDate: { type: String, required: true },
// });

// const returnBook = new Schema({
//   rollNo: { type: Number, required: true, unique: true },
//   bookId: { type: Number, required: true, unique: true },
//   returnDate: { type: String, required: true },
//   fineAmount: { type: String },
// });

// const issuedBookDetails = new Schema({
//   rollNo: { type: Number, required: true, unique: true },
//   bookId: { type: Number, required: true, unique: true },
//   issueDate: { type: String, required: true },
//   dueDate: { type: String, required: true },
//   status: { type: String },
// });

import { prop, getModelForClass } from "@typegoose/typegoose";

export class bookDetails {
  @prop({ required: true })
  bookId!: number;
  @prop({ required: true })
  bookName!: string;
  @prop({ required: true })
  author!: string;
  @prop({ required: true })
  quantity!: number;
}[]
export class issueBook{
  @prop({ required: true })
  rollno!: number;
  @prop({ required: true })
  bookId!: number;
  @prop({ required: true })
  issueDate!: Date;
  
}

export class studentDetails {
  @prop({ required: true })
  rollno!: number;
  @prop({ required: true })
  name!: string;
  @prop({ required: true })
  department!: string;
}



// class admin {
//   @prop({ required: true })
//   name!: string;
//   @prop({ required: true })
//   email!: string;
//   @prop({ required: true })
//   password!: string;
// }


export const BookModel = getModelForClass(bookDetails)
export const StudentModel = getModelForClass(studentDetails)
export const IssuebookModel = getModelForClass(issueBook)


//export const AdminModel = getModelForClass(admin)





