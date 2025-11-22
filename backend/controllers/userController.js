import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {loginId, email, password} = req.body;
        
        // Check if all fields are provided
        if(!loginId || !email || !password) {
            return res.status(401).json({
                message: "All Fields are required"
            })
        }

        // Check if email already exists
        const existUser = await userModel.findOne({
            email: email
        })
        if(existUser) {
            return res.status(400).json({
                message: "Email already exist"
            })
        }

        // Check if loginId already exists
        const existLoginId = await userModel.findOne({
            loginId: loginId
        })
        if(existLoginId) {
            return res.status(400).json({
                message: "Login ID already exist"
            })
        }

        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);

        // Create new user with HASHED password (FIXED HERE!)
        const newUser = await userModel.create({
            loginId: loginId,
            email: email,
            password: hashPass  // ✅ Changed from 'password' to 'hashPass'
        })

        res.status(200).json({
            message: "Register Successfully",
            user: {
                loginId: newUser.loginId,
                email: newUser.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in Signup controller",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const {loginId, password}  = req.body;
        
        // Fixed validation check
        if(!loginId || !password) {  // ✅ Changed from comma to ||
            return res.status(401).json({
                message: "All fields are required",
            })
        }

        const user = await userModel.findOne({
            loginId: loginId
        })
        if(!user) {
            return res.status(403).json({
                message: "User not exist"
            })
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(403).json({
                message: "Password not matched",
            })
        }

        // Create JWT token with proper payload
        const token = jwt.sign(
            { loginId: user.loginId, id: user._id },  // ✅ Better token payload
            process.env.JWT_SECRET,
            { expiresIn: '7d' }  // ✅ Added expiration
        );

        res.status(200).json({
            message: "Login Successfully",
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in login",
            error: error.message
        })
    }
}