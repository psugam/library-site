// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

const User =require('../../database/users.model');
const Book=require('../../database/books.model')

// Handling login request
router.delete("/deleteoneuser/:id", async (req,res,next)=>{
    const {id}=req.params;
    try{
        const deletedUser=await User.findByIdAndDelete(id);
        if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
         await Book.deleteMany({ userId:id });

        res.status(200).json({messgae:"User is deleted", id: id});
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})
module.exports=router