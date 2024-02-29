import { prop, getModelForClass } from "@typegoose/typegoose";

export class BookDetails {
  @prop({ required: true })
  bookId!: number;
  @prop({ required: true })
  bookName!: string;
  @prop({ required: true })
  author!: string;
  @prop({ required: true })
  quantity!: number;
}
[];
export class IssueBook {
  @prop({ required: true })
  combinedId!: string;
  @prop({ required: true })
  issueDate!: Date;
  @prop({ required: true })
  rentalDays!: number;
}

export class StudentDetails {
  @prop({ required: true })
  rollno!: number;
  @prop({ required: true })
  name!: string;
  @prop({ required: true })
  department!: string;
}

export const BookModel = getModelForClass(BookDetails);
export const StudentModel = getModelForClass(StudentDetails);
export const IssuebookModel = getModelForClass(IssueBook);
