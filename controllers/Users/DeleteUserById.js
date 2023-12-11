
const fs=require('fs-extra');
const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
exports.deleteUserById=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return Response.invalidInput(res,"User is not found");
    }
    console.log(id);
    try{
        userModel.getUserById(id,(user)=>{
            console.log(user);
            if(user){
                const path=user.profilePath;
                userModel.deleteUser(id,()=>{
                    if(path) {
                        fs.exists(path)
                            .then(() => fs.remove(path))
                            .catch((err) => {
                                console.error(`Error while checking or removing file: ${err.message}`);
                                throw err;
                            });
                    }                    
                    Response.sendSuccess(res,"User deleted successfully");
                });
                // {
                //     path && userModel.deleteUser(id,()=>{
                //         fs.remove(path)
                //         .then(() => {
                //             console.log('success!');
                //         })
                //         .catch(err => {
                //             return Response.sendFailed(res,err.message);
                //         })
                //     });
                // }
                // Response.sendSuccess(res,"User deleted successfully");
            }
            else{
                return Response.invalidInput(res,"user is not found");
            }
        })
    }catch(err){
        console.log("errror from catch block",err.message);
        return Response.sendFailed(res,err.message);
    }
}