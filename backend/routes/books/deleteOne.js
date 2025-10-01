// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

const Book =require('../../database/books.model');

// Handling login request
router.delete("/deleteone/:id", async (req,res,next)=>{
    const {id}=req.params;
    try{
        const deletedBook= await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(deletedBook);
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})
module.exports=router