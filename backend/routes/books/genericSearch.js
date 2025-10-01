const express = require("express");
const mongoose = require("mongoose");
const Book = require('../../database/books.model');
const app = express();
const router=express.Router();
const cors = require('cors')



app.use(express.json());
app.use(cors())
router.get("/search", async (req, res) => {
  try {
    const query = req.query; 
    const mode = query.mode || "and"; 
    delete query.mode;

    const conditions = [];

    for (let key in query) {
      if (["authors", "editors", "publisher", "languages", "genres"].includes(key)) {
        conditions.push({ [key]: { $regex: query[key], $options: "i" } });
      } else if (["rating", "price", "pages"].includes(key)) {
        conditions.push({ [key]: Number(query[key]) });
      } else if (key === "read_status") {
        conditions.push({ [key]: query[key] === "true" });
      } else {
        conditions.push({ [key]: { $regex: query[key], $options: "i" } });
      }
    }

    let searchQuery = {};
    if (mode.toLowerCase() === "or") {
      searchQuery = { $or: conditions };
    } else {
      searchQuery = { $and: conditions };
    }

    const books = await Book.find(searchQuery);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports=router