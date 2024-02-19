import express from "express";

import cors from "cors";
import router from "./Router/bookrouter.js"
import student from "./Router/studentrouter.js"
import book from "./Router/booktakenrouter.js"
import returnbook from "./Router/booktakenrouter.js"

const app= express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5000', 
};

app.use(cors(corsOptions));

const port: number = 5000;

import { connectMongo } from "./db";

connectMongo;


app.listen(port, () => {
  console.log(`Sucessfully connected to the port ${port}`);
});


app.use(router)
app.use(student)
app.use(book)
app.use(returnbook)