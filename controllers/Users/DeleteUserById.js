
const fs=require('fs-extra');
const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.deleteUserById=async(req,res)=>{
    const {id}=req.body;
    console.log(id);
    if(!id){
        return Response.invalidInput(res,"user is not found");
    }
    try{
        userModel.getUserById(id,(user)=>{
            console.log(user);
            if(user){
                const path=user.profilePath;
                {
                    path && userModel.deleteUser(id,()=>{
                        fs.remove(path)
                        .then(() => {
                            console.log('success!');
                        })
                        .catch(err => {
                            return Response.sendFailed(res,err.message);
                        })
                    });
                }
                Response.sendSuccess(res,"User deleted successfully");
            }
            else{
                return Response.invalidInput(res,"user is not found");
            }
        })
    }catch(err){
        return Response.sendFailed(res,err.message);
    }
}