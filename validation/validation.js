//email validation
function verifyEmail(email){
    const emailRegx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegx.test(email);
}

//password validator 
function validationOfInputFields(email,password){
    console.log("verify email function",verifyEmail(email));
    if (!email || !password || (email && !verifyEmail(email))) {
        return true;
    } else {
        return false;
    }
}
module.exports={
    verifyEmail,
    validationOfInputFields
};