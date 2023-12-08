//auth,isstudent,isadmin
const jwt=require("jsonwebtoken");
require("dotenv").config();
const Utils=require("../utils/Utils");
const Response=require("../utils/Response");
exports.auth=(req,res,next)=>{
    try{
        //extract jwt token
        console.log('Headers:', req.headers);
        const token = req.header("Authorization").replace("Bearer ","")    
        console.log("token",token);
        if(!token){
            return Response.sendNotFound(res,"Token missing");
        };
        //verify token
        try{ 
            const decode = Utils.verifyJwtToken(token);
            console.log(decode);
            req.user=decode;
        }
        catch(err){ 
            return Response.sendFailed(res,"Token invalid");
        };
        next();
    }
    catch(error){
        return Response.sendFailed(res,"something went wrong while varifying the token");
    }
}
exports.isstudent=(req,res,next)=>{
    try{
        if(req.user.role !== 1 ){
            return Response.sendFailed(res,"this is protected route for student");
        }
        next();
    }catch(err){
        return Response.sendFailed(res,"user role is not matching");
    };
}
exports.isadmin=(req,res,next)=>{
    try{
        if(req.user.role !== 2 ){
            return Response.sendFailed(res,"this is protected route for admin");
        }
        next();
    }catch(err){
        return Response.sendFailed(res,"user role is not matching");
    };
}
