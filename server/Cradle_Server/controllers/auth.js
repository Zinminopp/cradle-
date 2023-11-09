import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';



export const registerUser = async (req,res)=> {
    try {
        const {
            userName,
            email,
            password,
            profilePicture,
            friends
        } = req.body;

        //password encryption for storing encrypted password
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(password, salt);

        const new_user = new User({
            userName,
            email,
            password: hashed_password,
            profilePicture,
            friends

        });

        const saved_user = new_user.save();
        res.status(201).json(saved_user);
        
    }catch(err){
        res.status(500).json({error: err.message});
    }

};

export const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(404).json({message: "User doesn't exist. "});

        //comparing user input password with the encrypted password
        const matched = await bcrypt.compare(password, user.password)
        if(!matched) return res.status(404).json({message: "Wrong password. "});

        //signing a user specific token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({ token, user });


    } catch (err) {
        res.status(500).json({error: err.message})
        
    }
};
