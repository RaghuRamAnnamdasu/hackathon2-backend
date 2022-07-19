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

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
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



app.listen(port,()=>console.log(`App has Started in ${port}`));











