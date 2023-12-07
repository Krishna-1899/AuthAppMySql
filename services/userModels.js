// models/userModel.js
const connection = require('../config/MysqlConnection');
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
function updateUser(userId, name,role_id,callback) {
  const updatedUser={
    name:name,
    role_id:role_id,
    updatedAt:new Date(),
  };
  connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (error) => {
    if (error){
      console.error('error in updatng user table',error);
      return error;
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