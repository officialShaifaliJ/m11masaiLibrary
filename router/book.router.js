const express = require('express');
const { BookModel } = require('../model/book.model');
const BookRouter=express.Router();

BookRouter.get("/",async(req,res)=>{
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "MasaiLibrary");
    try{
        if(decoded){
            const books = await BookModel.find({"userID":decoded.userID});
            res.status(200).send({ "msg": books })
        }
    }
    catch(err){
        res.status(400).send({ "msg": err.message })
    }
})

BookRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "MasaiLibrary");
    try{
        if(decoded){
            const book = await BookModel.findOne({$and:[{_id:id},{"userID":decoded.userID}]})
            res.status(200).send({ "msg": book })
        }
    }
    catch(err){
        res.status(400).send({ "msg": err.message })
    }
})

BookRouter.get("/",async(req,res)=>{
    
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "MasaiLibrary");
    const query = req.query;
    console.log(token)
    try{
        if (decoded) {
            const books = await BookModel.find({$and:[{ "userID": decoded.userID },query]});
            res.status(200).send({ "msg": books })
        }
    }
    catch(err){
        res.status(400).send({ "msg": err.message })
    }
})

BookRouter.post("/",async(req,res)=>{
    try{
        const book = req.body;
        const books = await BookModel(book);
        res.status(200).send({ "msg": books })
    }
    catch(err){
        res.status(400).send({ "msg": err.message })
    }
})

module.exports = BookRouter;