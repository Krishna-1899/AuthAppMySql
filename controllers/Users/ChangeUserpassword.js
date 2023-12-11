const Utils = require("../../utils/Utils");
const userModel = require("../../services/UserModels");
const Response = require("../../utils/Response");
exports.changeUserPassword = async (req, res) => {
  const { password, newPassword, newConfirmPassword } = req.body;
  if (!newPassword == newConfirmPassword) {
    return Response.sendFailed(
      res,
      "Password and confirm password does not match"
    );
  }
  const id = req.user.id;
  console.log(id);
  try {
    userModel.getUserById(id, async (user) => {
      const actualPassword = user.password;
      if (Utils.verifyPassword(password, actualPassword)) {
        const Password = await Utils.hashedPassword(newPassword);
        userModel.updateUser(id, { password: Password }, (value) => {
          if (!value) {
            Response.sendSuccess(res, "Password change successfully");
          } else {
            Response.sendFailed(res, `${value}`);
          }
        });
      } else {
        Response.sendFailed(res, "Password does not match");
      }
    });
  } catch (err) {
    Response.sendFailed(res, err.message);
  }
};
