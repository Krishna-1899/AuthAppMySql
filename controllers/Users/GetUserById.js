const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.getUserByID=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return Response.invalidInput(res,"Invalid Id");
    }
    userModel.getUserById(id,(user)=>{
        Response.sendSuccess(res,user);
    });
}