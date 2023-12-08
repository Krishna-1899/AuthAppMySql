
const fs=require('fs-extra');
const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.deleteUserById=async(req,res)=>{
    const {id}=req.body;
    console.log(id);
    if(!id){
        return Response.invalidInput(res,"user is not found");
    }
    userModel.getUserById(id,(user)=>{
        console.log(user);
        if(user){
            const path=user.profileImage;
    
            userModel.deleteUser(id,()=>{
                Response.sendSuccess(res,"User deleted successfully");
            });
            if(path){
               fs.remove(path,err=>{
                if (err) return console.error(err)
               }) 
            }
        }
        else{
            return Response.invalidInput(res,"user is not found");
        }
        
    })
}