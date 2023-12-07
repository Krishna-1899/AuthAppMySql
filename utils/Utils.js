const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken");
//function for hashing the password
function hashedPassword(password){
    let hashedPassword;
    try {
        return hashedPassword = bcrypt.hash(password, 10);

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in hashing password",
        });
    }
}
//verify userpassword
async function verifyPassword(UserPassword,actualPassword){
    return await bcrypt.compare(UserPassword, actualPassword);
}
//generate jwt token
function generateToken(payload){
    return  jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: "2h",
    });
}
//verify token to pass in decode and then in req.user
function verifyJwtToken(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}
module.exports={
    hashedPassword,
    verifyPassword,
    generateToken,
    verifyJwtToken,
};