const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.getUserByID=async(req,res)=>{
    const {id}=req.body;
    console.log(id);
    if(!id){
        return Response.invalidInput(res,"Invalid Id");
    }
    userModel.getUserById(id,(user)=>{
        if(user){
            return Response.sendSuccess(res,user);
        }
        else{
            return Response.sendNotFound(res,"User not found")
        }
    });
}