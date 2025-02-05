const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const router = express.Router();

const SECRET_KEY = "mysecretkey";

//sign-up
router.post('/signup', async (req,res) => {
    const {username,password} = req.body;

    try {
    const existingUser = await User.findOne({username})
    if (existingUser) return res.status(400).json({message:"User already exists"});
    
    const hashedPassword = await bcrypt.hash(password,15);
    const newUser = new User ({ username, password:hashedPassword})
    await newUser.save();

    res.status(201).json({message:"User created successfully"}   )
    }catch (err){
            res.status(500).json({error: err.message})
        }
 
});

//login
router.post('/login', async (req,res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({message:"user no found"})
        const isPasswordValid = await bcrypt.compare(password, user.password) ;
        if (!isPasswordValid) return res.status(400).json({message:"Invalid  credentials"});
        const token = jwt.sign({ userId: user._id}, SECRET_KEY, {expiresIn:'1h'})
       res.json({token, username: user.username });
        } catch (err) {
            res.status(500).json({error: err.message})
        }
})
module.exports = router;
