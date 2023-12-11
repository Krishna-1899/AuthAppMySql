const userModel = require("../../services/UserModels");
const Response = require("../../utils/Response");
const fs = require("fs-extra");
exports.addUserProfile = async (req, res) => {
  const id = req.user.id;
  const file = req.files.file;
  const fileType = file.name.split(".")[1].toLowerCase();
  const supportedTypes = ["jpg", "jpeg", "png"];
  if (!supportedTypes.includes(fileType))
    return Response.sendFailed(res, "File not supported");
  try {
    userModel.getUserById(id, async (user) => {
      const oldPath = user.profilePath;
      if (oldPath){
        let result = await fs.exists(oldPath)
        if(result)
            fs.remove(oldPath)
      }
      let path =__dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
      console.log("PATH->", path);
      file.mv(path).then(()=>{
        userModel.updateUser(id, { path: path }, (value) => {
            if (value){
              fs.remove(path)
                .then(() => {
                  console.log("file is removed because there is error in updation");
                })
                .catch((err) => {
                  console.log("error while removing the file");
                  throw new err
                });
              return Response.sendFailed(res, value);
            }
            return Response.sendSuccess(res, "Profile picture Added Successfully");
          });
      }).catch((err)=>{
        Response.sendFailed(res,err.message);
      })
    });
  }catch (error) {
    console.log("printing from final catch block",error);
    return Response.sendFailed(res, error.message);
  }
};
