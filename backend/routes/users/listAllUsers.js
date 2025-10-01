// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

const User =require('../../database/users.model');

// Handling login request
router.get("/listallusers", async (req,res,next)=>{

    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})
module.exports=router