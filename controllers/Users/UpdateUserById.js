const userModel = require("../../services/UserModels");
const Response = require("../../utils/Response");
const Utils = require("../../utils/Utils");
const { verifyEmail } = require("../../validation/Validation");
require("dotenv").config();
exports.updateUserById = async (req, res) => {
  const { name, email, role } = req.body;
  const id = req.user.id;
  if(email){
    userModel.getUserByEmail(email, (result) => {
      if (result) return Response.sendFailed(res, "email already registered");
    });
  }
  if (!verifyEmail(email)) return Response.invalidInput(res, "Invalid Email ");
  console.log("id from req.user", id);
  try {
    userModel.getUserById(id, (user) => {
      if(user) {
        const userDetails = {
          name: name,
          email: email,
          role_id: role,
        };
        userModel.updateUser(id,userDetails,(value) => {
          if (value) {
            return Response.invalidInput(res, "Invalid Input");
          }
          return Response.sendCreated(res, "User updated successfully");
        });
      } else {
        return Response.sendNotFound(res, "User Not Found");
      }
    });
  } catch (error) {
    Response.sendFailed(
      res,
      "Some thing went wrong when updating the user details"
    );
  }
};
