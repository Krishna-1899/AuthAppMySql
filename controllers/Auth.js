const bcrypt = require("bcrypt");
const connection=require("../config/mysqlConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/userModels");
//signup route handler
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //first validate the email 
        function verifyEmail(email){
            const emailRegx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log("inside verifyEmail function");
            return emailRegx.test(email);
        } 
        if(!email||!verifyEmail(email)||!password){
            return res.status(400).json({
                success:false,
                message:"Email and password is not valid"
            })
        }
        //check if user already exists
        userModel.getUserByEmail(email,(user) => {
            if (user) {
                res.status(400).json({
                    success:false,
                    message:"User already exists"
                });
            } else {
                //if user is not registered then registeredd it
                createNewUser(name,email,password,role);
            }
        });
        //function for signup after cheking all the details
        async function createNewUser(name,email,password,role){

            //hashed the password
            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(password, 10);
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error in hashing password",
                });
            }
            //caling the model function to insert the data to table
            userModel.createUser(name,email,password=hashedPassword,role,(userId)=>{
                res.status(200).json({
                    success:true,
                    message:"New user SignUp",
                    id:userId
                })
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered",
        });
    }
};
// handler for login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "enter all details",
        });
        };
        // retriving the data form table on basis of email and password
        userModel.getUserByEmail(email,(user) => {
            console.log(user);
            if (!user){
                res.status(401).json({
                    success:false,
                    message:"User is not registered"
                });
            } else {
                //if user is not registered then registeredd it
                loginUser(user);
            }
        });
        async function loginUser(user){
            const payload = {
                email: user.email,
                id: user.id,
                role: user.role,
            };
            //verfy password and generate jwt token
            if (await bcrypt.compare(password, user.password)) {
                // password match
                let token = jwt.sign(payload, process.env.JWT_SECRET, { 
                    expiresIn: "2h",
                });
                user.token = token;
                user.password=undefined;
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };
                res.status(200).json({
                    success: true,
                    user,
                    message: "login succesfully",
                });
            } else {
                //password do not match
                return res.status(403).json({
                    success: false,
                    message: "password incorrect",
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "login failure",
        });
    }
};
