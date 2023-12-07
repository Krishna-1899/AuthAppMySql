const userModel = require("../../services/userModels");
const Response=require("../../utils/Response");
exports.getUserByID=async(req,res)=>{
    const {id}=req.body;
    userModel.getUserById(id,(user)=>{
        Response.sendSuccess(res,user);
    });
}