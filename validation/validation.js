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
function areAllNotEmpty(...values) {
    // Check if all values are not undefined, not null, and not empty strings
    return values.every(value => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(innerValue => innerValue !== undefined && innerValue !== null && innerValue !== '');
      } else {
        return value !== undefined && value !== null && value !== '';
      }
    });
}
module.exports={
    areAllNotEmpty,
    verifyEmail,
    validationOfInputFields
};