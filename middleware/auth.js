//auth,isstudent,isadmin
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.auth=(req,res,next)=>{
    try{
        //extract jwt token
        const token=req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            });
        };
        //verify token
        try{ 
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }
        catch(err){ 
            return res.status(401).json({
                success:false,
                message:"token invalid"
            });
        };
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while varifying the token"
        });
    }
}
exports.isstudent=(req,res,next)=>{
    try{
        if(req.user.role !== "Student" ){
            return res.status(401).json({
                success:false,
                message:"this is protected route for student"
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"user role cannot is not matching"
        });
    };
}
exports.isadmin=(req,res,next)=>{
    try{
        if(req.user.role !== "Admin" ){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"user role cannot is not matching"
        });
    };
}
