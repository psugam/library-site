// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

const Book =require('../../database/books.model');

// Handling login request
router.get("/listall", async (req,res,next)=>{

    try{
        const books = await Book.find({});
        res.status(200).json(books);
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})
module.exports=router