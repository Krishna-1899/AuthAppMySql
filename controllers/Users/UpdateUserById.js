const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
const Utils=require("../../utils/Utils");
const jwt=require("jsonwebtoken");
const { validationOfInputFields, areAllNotEmpty } = require("../../validation/Validation");
require("dotenv").config();
exports.updateUserById=async(req,res)=>{
    const {name,email,role_id,token}=req.body;
    try{
        const decode = Utils.verifyJwtToken(token, process.env.JWT_SECRET);
        const id = decode.id;
        userModel.getUserByEmail(email,(result)=>{
            console.log(result);
            if(result){
                return Response.sendFailed(res, "Email Already exists");
            }
            userModel.updateUser(id, name, email, role_id,()=>{
                Response.sendCreated(res, "User updated successfully");
            });
        });
    }catch(error){
        Response.sendFailed(res, "Token invalid");
    }
}