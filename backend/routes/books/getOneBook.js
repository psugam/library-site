const express=require('express');
const router=express.Router();

const auth=require('../../middleware/auth');
const Book =require('../../database/books.model');


router.get("/getonebook/:bookId", auth, async (req,res,next)=>{
    const {bookId}=req.params;
    try{
        const books = await Book.find({_id: bookId});
        res.status(200).json(books);
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})





module.exports=router