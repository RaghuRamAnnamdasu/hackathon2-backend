import express from "express";
import {request, response} from "express";
import {Db, MongoClient} from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routers/user.js";
import { questionsRouter } from "./routers/questions.js";
import { membersRouter } from "./routers/members.js";
import { tagsRouter } from "./routers/tags.js";
import nodemailer from "nodemailer";

const app = express();


// app.use(cors());
// dotenv.config();
// app.use(express.json());

 dotenv.config(); 
 app.use( cors({ origin: "*", }) );
app.use(express.json());

const PORT = process.env.PORT;
const Mongo_URL = process.env.Mongo_URL;

async function createConnection(){
    const client = new MongoClient(Mongo_URL);
    await client.connect();
    console.log("MongoDB is Connected");
    return client;
}

export const client = await createConnection();

app.get("/", async function(request,response){
    response.send("Hi, Welcome to Hackathon...!!!")

})

app.use("/user",userRouter);
app.use("/questions",questionsRouter);
app.use("/members",membersRouter);
app.use("/tags",tagsRouter);




app.listen(PORT,()=>console.log(`App has Started in ${PORT}`));











