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
    if (error) throw error;
    callback(results[0]);
  });
}
function getUserByEmail(email,callback){
    console.log(email);
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
  console.log(userDetails);
  const updateFields = {};
  if ( userDetails.name !== undefined) updateFields.name = userDetails.name;
  if ( userDetails.email !== undefined && verifyEmail(userDetails.email)) updateFields.email = userDetails.email;
  if ( userDetails.role_id !== undefined) updateFields.role_id = userDetails.role_id;
  if(userDetails.path !== undefined) updateFields.profileImage=userDetails.path;
  console.log(updateFields);
  if (!areAllNotEmpty(updateFields)) {
    callback("Not Valid Input")
  }
  updateFields.updatedAt = new Date();

  const updateQuery = `UPDATE users SET ${Object.keys(updateFields)
    .map((field) => `${field} = ?`)
    .join(', ')} WHERE id = ?`;
  const values = [...Object.values(updateFields), userId];
  connection.query(updateQuery, values, (error) => {
    if (error) {
      console.error('Error updating user table', error);
      callback(error.message);
    }
    callback();
  });
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



// SELECT users.*, role.role FROM users JOIN role ON users.role_id = role.role_id WHERE users.id = 1;