const userModel = require("../../services/userModels");
const Response=require("../../utils/Response");
const Utils=require("../../utils/Utils");
const jwt=require("jsonwebtoken");
exports.deleteUserById=async(req,res)=>{
    const {token}=req.body;
    if(Utils.verifyJwtToken(token)){
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        const id=decode.id;
        userModel.deleteUser(id,()=>{
            Response.sendCreated(res,"User deleted successfully");
        })
    }
}