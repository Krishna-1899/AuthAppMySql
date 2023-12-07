// utils/response.js
function sendSuccess(res, data) {
    res.status(200).json({ 
        success: true,
        data 
    });
}
  
function sendCreated(res,message, data) {
    res.status(201).json({ 
        success: true,
        message:message, 
        data 
    });
}
function invalidInput(res,message,data){
    res.status(400).json({
        success:false,
        message:message,
        data
    });
} 
function sendNotFound(res, message) {
    res.status(404).json({ 
        success: false, 
        message:message 
    });
}
function sendFailed(res,message){
    res.status(500).json({ 
        success: false, 
        message:message 
    });
}
function sendLogin(res,token,message,data){
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({ 
        success: true, 
        message:message,
        data
    });
}
module.exports = {
    sendLogin,
    sendFailed,
    sendSuccess,
    sendCreated,
    invalidInput,
    sendNotFound,
};
  