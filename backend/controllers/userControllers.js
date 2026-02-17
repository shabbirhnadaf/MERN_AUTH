import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import generateToken from '../utils/generateTokens.js';
import { protect } from '../middleware/authMiddleware.js';


const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;
    const userExists = await User.findOne({ email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name: name,
        email: email,
        password: password,
    });
    if (!user) {
        res.status(400);
        throw new Error('Invalid user data');
    }
    generateToken(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User logged out successfully' });
});
const getUserProfile = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if(!user) {
        res.status(401).json('User does not exist');
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email   
    });
});
const updateUserProfile = asyncHandler(async (req, res) => {
    const {name, email} = req.body;
    const user = await User.findById(req.user._id);
    if(!user) {
        res.status(401).json('User not exist');
    }
    user.name= name || user.name;
    user.email = email || user.email;
    if(req.body.password) {
        user.password = req.body.password;
    }
    const updated = await user.save();
    if(updated) {
        res.status(200).json({ message: 'User profile updated successfully' });
    } else {
        res.status(401).json('user data is not updated');
    }
});
export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };