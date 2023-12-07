const userModel = require("../../services/userModels");
const Response=require("../../utils/Response");
exports.getAllUsers=async(req,res)=>{
    try{
        // const {email}=req.body;
        // if(!email){
        //     Response.invalidInput(res,"Email not found");
        // }
        userModel.getAllUsers((user)=>{
            Response.sendSuccess(res,user);
        });
        // userModel.getUserByEmail(email,(user)=>{
        //     console.log(user);
        //     Response.sendSuccess(res,user);
        // });
    }catch(error){
        Response.sendFailed(res,"Something Went wrong when fetching the Users");
    }
}