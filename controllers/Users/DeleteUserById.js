const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.deleteUserById=async(req,res)=>{
    if(!id){
        return Response.invalidInput(res,"id is  not valid");
    }
    const {id}=req.body;
    userModel.deleteUser(id,()=>{
        Response.sendCreated(res,"User deleted successfully");
    });
}