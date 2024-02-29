import express from "express";
import { connectMongo } from "./db";
import cors from "cors";
import issueBook from "./Router/bookTakenRouter.js"
import student from "./Router/studentRouter.js"
import book from "./Router/bookTakenRouter.js"
import * as dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.BASE_URL;
const app= express();
app.use(express.json());

const corsOptions = {
  origin: baseUrl, 
};

app.use(cors(corsOptions));

const port: number = 5000;



connectMongo;


app.listen(port, () => {
  console.log(`Sucessfully connected to the port ${port}`);
});


app.use('/book', book)
app.use('/student',student)
app.use('/issueBook',issueBook)