// Importing the module
const express=require("express")
const cors=require('cors');


// Creating express Router
const router=express.Router()
const app=express();
app.use(cors());
app.use(express.json());

const User =require('../../database/users.model');

// Handling login request
router.post("/addoneuser", async (req,res,next)=>{

    try{
        const {username, email, password}=req.body;
        const existingUser=await User.find({username:username});
        if(existingUser.length==0){
            const newUser = new User({ username, email, password });
        await newUser.save(); // Save the new user to the database
        res.status(201).json(newUser); // Send back the created user
        // res.status(200).json({messgae:"Correct"});
        }else{
            return res.status(400).json({ msg: "User already exists. Please choose a new username and try again.", sugam:existingUser })
        }
        
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})
module.exports=router