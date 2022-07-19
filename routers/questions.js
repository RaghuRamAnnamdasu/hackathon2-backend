import express from "express";
import {createUSer, getUserByName} from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { client } from "../index.js";

const router = express.Router();

router.get("/", async function(req,res){
    const questions = await client.db("stackOverFlow").collection("questions").find().toArray();
    res.send(questions);
})


router.put("/:question_id/votes",async function(req,res){
    const {question_id} = req.params;
    const {votes} = req.body[0];
    console.log(votes,question_id,typeof(question_id));
    const result = await client.db("stackOverFlow").collection("questions").updateOne({question_id: +question_id},{$set: {votes: votes}});
    res.send(result);
})

router.get("/:question_id",async function(req,res){
    const {question_id} = req.params;
    const question = await client.db("stackOverFlow").collection("questions").find({question_id: +question_id}).toArray();
    res.send(question);
})


router.post("/askquestion",async function(req,res){
    try{
        const data = req.body[0];
        console.log(data);
        const existingQuestions = await client.db("stackOverFlow").collection("questions").find().toArray();
        console.log(existingQuestions.length+1)
        const result = await client.db("stackOverFlow").collection("questions").insertOne({question_id: existingQuestions.length+1,...data});
        res.send(result);
    }catch(err){
        res.status(404).send(err)
    }
    
})

router.put("/:question_id/answer",async function(req,res){
    const {question_id} = req.params;
    const answer = req.body[0];
    let newAnswers;
    console.log(answer);
    const existingAnswers = await client.db("stackOverFlow").collection("questions").find({question_id: +question_id}).toArray();
    console.log(existingAnswers);
    if(existingAnswers[0].Answers){
        newAnswers = [...existingAnswers[0].Answers,answer];
        console.log('2',newAnswers);
    }else{
        newAnswers = [answer];  
    }
    
    const result = await client.db("stackOverFlow").collection("questions").updateOne({question_id: +question_id},{$set: {Answers: newAnswers}});
    res.send(result);
})




export const questionsRouter = router;
