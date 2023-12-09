const express=require("express");
const router=express.Router();
const {signup}=require("../controllers/SignUp/SignUp");
const {login}=require("../controllers/Login/Login");
const {getAllUsers}=require("../controllers/Users/GetAllUsers");
const {getUserByID}=require("../controllers/Users/GetUserById");
const {updateUserById}=require("../controllers/Users/UpdateUserById");
const {deleteUserById}=require("../controllers/Users/DeleteUserById");
const {addUserProfile}=require("../controllers/Users/AddUserProfile");
const {auth,isstudent,isadmin}=require("../middleware/auth");
const { changeUserPassword } = require("../controllers/Users/ChangeUserpassword");
router.post("/login",login);
router.post("/signup",signup);
router.get("/getAllUsers",getAllUsers);
router.get("/getUserById",getUserByID);
router.put("/updateUserById",auth,updateUserById);
router.delete("/deleteUserById",auth,isadmin,deleteUserById);
router.post("/addUserProfile",auth,addUserProfile);
router.put("/changeUserPassword",auth,changeUserPassword);
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
