import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {loginId, email, password} = req.body;
        if(!loginId || !email || !password) {
            return res.status(401).json({
                message: "All Fields are required"
            })
        }

        const existUser = await userModel.findOne({
            email: email
        })
        if(existUser) {
            return res.status(400).json({
                message: "Email already exist"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            loginId: loginId,
            email: email,
            password: password
        })

        res.status(200).json({
            message: "register Successfully",
            newUser
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
        if(!loginId, !password) {
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

        const hashPass = await bcrypt.compare(password, user.password);
        if(!hashPass) {
            return res.status(403).json({
                message: "Password not matched",
            })
        }

        const token = await jwt.sign(loginId, process.env.JWT_SECRET);

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