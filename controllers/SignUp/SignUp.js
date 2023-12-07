const userModel = require("../../services/UserModels");
const validation=require("../../validation/Validation");
const Utils=require("../../utils/Utils");
const Response=require("../../utils/Response");
require("dotenv").config();
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;
        //first validate the email 
        if(validation.validationOfInputFields(email,password)){
            return Response.invalidInput(res,"Email and Password invalid")
        }
        //check if user already exists
        userModel.getUserByEmail(email,(user) => {
            if (user) {
                return Response.invalidInput(res,"User Already exits",user);
            } else {
                //if user is not registered then registered it
                createNewUser(name,email,password,role_id);
            }
        });
        //function for signup after cheking all the details
        async function createNewUser(name,email,password,role_id){
            //hashed the password
            const newPassword=await Utils.hashedPassword(password);
            console.log(newPassword);
            //caling the model function to insert the data to table
            userModel.createUser(name,email,password=newPassword,role_id,(data)=>{
                return Response.sendCreated(res,"New User SignUp",data)
            });
        }
    } catch (error) {
        console.error(error);
        return Response.sendFailed(res,"User cannot br registered");
    }
};