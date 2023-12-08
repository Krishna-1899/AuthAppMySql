const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
const Utils=require("../../utils/Utils");
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
            const userDetails={
                name:name,
                email:email,
                role_id:role_id
            }
            userModel.updateUser(id,userDetails,()=>{
                Response.sendCreated(res, "User updated successfully");
            });
        });
    }catch(error){
        Response.sendFailed(res, "Token invalid");
    }
}