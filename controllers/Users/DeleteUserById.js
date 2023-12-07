const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.deleteUserById=async(req,res)=>{
    const {id}=req.body;
    userModel.deleteUser(id,()=>{
        Response.sendCreated(res,"User deleted successfully");
    });
}