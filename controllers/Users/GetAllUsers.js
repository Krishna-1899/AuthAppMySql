const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.getAllUsers=async(req,res)=>{
    try{
        userModel.getAllUsers((user)=>{
            Response.sendSuccess(res,user);
        });
    }catch(error){
        Response.sendFailed(res,"Something Went wrong when fetching the Users");
    }
}