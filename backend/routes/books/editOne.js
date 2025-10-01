const express=require('express');
const router=express.Router();

const Book =require('../../database/books.model');

router.put('/editone/:id', async(req, res, next)=>{
    const {id}=req.params;
    try{
        const updatedBook = await Book.findByIdAndUpdate(
            id, {
                $set:req.body
            },
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedBook){
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message});
    }
})

module.exports=router