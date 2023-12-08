const userModel = require("../../services/UserModels");
const Response=require("../../utils/Response");
const Utils=require("../../utils/Utils");

exports.addUserProfile=async(req,res)=>{
    const id=req.user.id;
    try{
        const file=req.files.file;
        console.log("image from req",file);
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        const supportedTypes=["jpg","jpeg","png"];
        function isFileTypeSupport(fileType,supportedTypes){
            return supportedTypes.includes(fileType);
        }
        if(isFileTypeSupport(fileType,supportedTypes)){
            let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
            console.log("PATH->",path);
            file.mv(path ,(err)=>{
                console.log(err);
            });
            userModel.updateUser(id,{path:path},(value)=>{
                if(value){
                    Response.sendFailed(res,value);
                }
               Response.sendSuccess(res,"Profile picture Added Successfully"); 
            },path);
        }
    }catch(error){
        console.log(error);
    }
}