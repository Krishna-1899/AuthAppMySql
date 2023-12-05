const bcrypt = require("bcrypt");
const connection=require("../config/mysqlConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //check if user already exists
        const existingUser = await connection.promise().query(`SELECT * FROM users WHERE email='${email}'`);
        console.log(existingUser[0].length);
        if (existingUser>0) {
            return res.status(400).json({
                success: false,
                message: "User already Exists",
            });
        }
        //secrure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }
        //create entry for user
        const user = await connection.promise().query(`INSERT INTO users (name,email,password,role) VALUES(?,?,?,?)`,[name,email,password,role], (error, results) => {
            if (error) throw error;
            console.log("in insertion");
        });
        return res.status(200).json({
            success: true,
            message: "User created succesfully",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered",
        });
  }
};

//handler for login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "enter all details",
//       });
//     };
//     let user = await User.findOne({email});
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "user is not register",
//       });
//     }
//     const payload = {
//       email: user.email,
//       id: user._id,
//       role: user.role,
//     };
//     //verfy password and generate jwt token
//     if (await bcrypt.compare(password, user.password)) {
//       //password match
//       let token = jwt.sign(payload, process.env.JWT_SECRET, { 
//         expiresIn: "2h",
//       });
//       user = user.toObject();
//       user.token = token;
//       delete user.password;
//       const options = {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//       };
//       res.cookie("token", token, options).status(200).json({
//         success: true,
//         token,
//         user,
//         message: "login succesfully",
//       });
//     } else {
//       //password do not match
//       return res.status(403).json({
//         success: false,
//         message: "password incorrect",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: false,
//       message: "login failure",
//     });
//   }
// };
