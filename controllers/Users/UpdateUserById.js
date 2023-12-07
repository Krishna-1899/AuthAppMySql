const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
const Utils=require("../../utils/Utils");
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.updateUserById=async(req,res)=>{

    const {name,role_id,token}=req.body;
    if(Utils.verifyJwtToken(token)){
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        const id=decode.id;
        userModel.updateUser(id,name,role_id,()=>{
            Response.sendCreated(res,"user updated successfully");
        });
    }
}