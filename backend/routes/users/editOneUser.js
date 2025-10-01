const express=require('express');
const router=express.Router();

const User =require('../../database/users.model');


router.put('/editoneuser/:id', async(req, res, next)=>{
    const {id}=req.params;
    try{
        const updatedUser = await User.findByIdAndUpdate(
            id, {
                $set:req.body
            },
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
      message: "User updated successfully",
      book: updatedUser,
    });
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message});
    }
})


module.exports=router