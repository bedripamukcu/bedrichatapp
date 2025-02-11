const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const router = express.Router();
const crypto = require('crypto');
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

router.post('/forgot-password',async(req,res) => {
    const { email} = req.body;
    const user = await User.findOne ({email});

    if (!user) {
        return res.status(404).json({message: 'User not found'})
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();
    console.log(`Password reset link: http://localhost:3000/reset-password/${resetToken}`);
    res.json({message: 'Password reset link has been sent.'});
});
router.post('/reset-password', async (req,res) => {
    const { token, newPassword} = req.body;
    const user = await User.findOne({ resetToken: token , resetTokenExpire: { $gt: Date.now()}})
    if (!user) {
        return res.status(400).json({message: 'Invalid or expired token'})
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword,salt)

    user.resetToken = undefined;
    user.resetTokenExpire = undefined

    await user.save();
    res.json({ message: 'Password has been reset succesfully'})
})

module.exports = router;
