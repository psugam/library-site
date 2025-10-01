const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const dotenv=require('dotenv');
dotenv.config();

const User = require('../../database/users.model');

// LOGIN route
router.post('/loginuser', async (req, res) => {
  const { username, password } = req.body;
  // console.log("Login request:", username, password);

  try {
    const existingUser = await User.findOne({ username, password });
    // console.log("Found user:", existingUser);

    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid username or password" });
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
