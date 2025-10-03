const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const dotenv=require('dotenv');
dotenv.config();

const User = require('../../database/users.model');

// LOGIN route
router.post('/loginuser', async (req, res) => {
  const { username, password } = req.body;
  // console.log("Login request:", username, password);

  try {
    
    
    const existingUser = await User.findOne({ username});
    // console.log("Found user:", existingUser);

    if (!existingUser) {
      return res.status(400).json({ msg: "No such user !" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
      res.status(400).json({msg:"Invalid password. Try again"});
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set!");
      return res.status(500).json({ msg: "JWT secret missing" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Generated token:", token);

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});


module.exports = router;
