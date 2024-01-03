const express = require('express');
const Book = require('../models/bookModel');
const router = express.Router();
router.post('/', async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "send all info",
            });
        }
    
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
    
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message
        });
    }
    
});
router.get('/', async (req,res) =>{
    try {
        const allBooks = await Book.find({});
        const op ={
            count: allBooks.length,
            books: allBooks
        }
        return res.status(200).send(op);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
});
router.get('/:id', async (req,res) =>{
    try {

        const {id} = req.params;
        const book = await Book.findById(id);
         if(!book){
            return res.status(404).send({message: 'book not found'});
        }
        return res.status(200).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
});
router.put('/:id', async (req,res) =>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "send all info",
            });
        }
        const {id} = req.params;
        
        const book = await Book.findByIdAndUpdate(id,req.body);
        if(!book){
            return res.status(404).send({message: 'book not found'});
        }
        return res.status(200).send({message: 'update successfull'});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
});
router.delete('/:id', async (req,res) =>{
    try {

        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
         if(!book){
            return res.status(404).send({message: 'book not found'});
        }
        return res.status(200).send({message: 'book removed'});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
});

module.exports = router;