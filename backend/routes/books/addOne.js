// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

const Book =require('../../database/books.model');

// Handling login request
router.post("/addone", async (req,res,next)=>{

    try{
        const {userId, name, authors,editors, publisher, languages, 
                published_date, cover_images, price, pages, 
                genres, read_status, summary, my_note,
                rating, read_date, lent_to
        } =req.body;
        const newBook=new Book({
           userId, name, authors,editors, publisher, languages, 
                published_date, cover_images, price, pages, 
                genres, read_status, summary, my_note,
                rating, read_date, lent_to 
        }) 
        await newBook.save();

        res.status(201).json(newBook);
    }
    catch(error){
        res.status(500).json({message:"Error occured", error:error.message})
    }
  
})
module.exports=router