const express=require("express");
const router=express.Router();
const {signup,login}=require("../controllers/Auth");
const {auth,isstudent,isadmin}=require("../middleware/auth");
router.post("/login",login);
router.post("/signup",signup);
// testing route for single  middleware
router.get("/test",auth,(req,res)=>{ 
    res.json({
        success:true,
        message:"welcome to the protected route for tests"
    });
});
// protected route
router.get("/student",auth,isstudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for student"
    });
});
router.get("/admin",auth,isadmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for admin"
    });
})
module.exports=router;
