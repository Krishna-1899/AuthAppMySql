// models/userModel.js
const connection = require('../config/MysqlConnection');
const { verifyEmail, areAllNotEmpty } = require('../validation/Validation');
function getAllUsers(callback) {
  connection.query('SELECT * FROM users;', (error, results) => {
    if (error) throw error;
    callback(results);
  });
}
function getUserById(userId, callback) {
  const query = `SELECT * FROM users WHERE id=?;`;
  connection.query(query, [userId], (error, results) => {
    if (error){
      console.log(error);
      return callback();
    }
    callback(results[0]);
  });
}
function getUserByEmail(email,callback){
    const query = `SELECT * FROM users WHERE email=?`;
    connection.query(query,[email],(error,results)=>{
        if (error) throw error;
        callback(results[0]);
    });
}
function createUser(name,email,password,role_id, callback) {
  const insertUser = `
    INSERT INTO users (name, email, password, createdAt, updatedAt,role_id)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,?);
  `;
  connection.query(insertUser, [name,email,password,role_id], (error, Results) => {
    if (error) {
      console.error('Error inserting into users table:', error);
    }
    // Get the user ID from the last inserted row
    const userId = Results.insertId;
    console.log('Data inserted successfully.');
    //returning data 
    getUserById(userId,(user)=>{
      callback(user);
    });
  });
}
function updateUser(userId,userDetails,callback) {
  console.log("user details ",userDetails);
  let ValidInput = false;
  const updateFields = {};
  if ( userDetails.name !== undefined) updateFields.name = userDetails.name;
  if ( userDetails.email !== undefined && verifyEmail(userDetails.email)) 
  {
    updateFields.email = userDetails.email;
    ValidInput=true
  }
  if ( userDetails.role_id !== undefined && (userDetails.role_id==1||userDetails.role_id==2))
  {
    updateFields.role_id = userDetails.role_id;
    ValidInput=true
  }
  if(userDetails.path !== undefined) updateFields.profileImage=userDetails.path;
  console.log("updated field",updateFields);
  if (!areAllNotEmpty(updateFields) || !ValidInput) {
    callback("Not Valid Input");
  }else{
    updateFields.updatedAt = new Date();
    const updateQuery = `UPDATE users SET ${Object.keys(updateFields).map((field) => `${field} = ?`).join(', ')} WHERE id = ?`;
    const values = [...Object.values(updateFields), userId];
    connection.query(updateQuery, values, (error) => {
      if (error) {
        console.error('Error updating user table', error);
        callback(error.message);
      }
      callback();
    });
  }
}


function deleteUser(userId, callback) {
  connection.query('DELETE FROM users WHERE id = ?', [userId], (error) => {
    if (error) throw error;
    callback();
  });
}
module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};