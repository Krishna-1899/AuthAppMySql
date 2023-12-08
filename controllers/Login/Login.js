const userModel = require("../../services/UserModels");
const Utils=require("../../utils/Utils");
const { validationOfInputFields } = require("../../validation/Validation");
const Response=require("../../utils/Response");
require("dotenv").config();


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (validationOfInputFields(email,password)){
            return Response.invalidInput(res,"Email and Password is invalid");
        };
        // retriving the data form table on basis of email and password
        userModel.getUserByEmail(email,(user) => {
            console.log(user);
            if (!user){
                return Response.sendNotFound(res,"User Not Found");
            } else {
                //if user is not registered then registeredd it
                loginUser(user);
            }
        });
        async function loginUser(user){
            console.log(user);
            const payload = {
                email: user.email,
                id: user.id,
                role: user.role_id,
            };
            //verfy password and generate jwt token
            if (await Utils.verifyPassword(password,user.password)) {
                // password match
                let token = Utils.generateToken(payload);
                user.token = token;
                user.password=undefined;
                return Response.sendLogin(res,token,"Login successfully",user)
            } else {
                //password do not match
                return Response.sendFailed(res,"Email and password not valid");
            }
        }
    } catch (err) {
        console.log(err);
        return Response.sendFailed(res,"Login Failure")
    }
};
