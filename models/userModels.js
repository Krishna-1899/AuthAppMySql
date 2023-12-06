// models/userModel.js
const connection = require('../config/mysqlConnection');
function getAllUsers(callback) {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    callback(results);
  });
}
function getUserById(userId, callback) {
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) throw error;
    callback(results[0]);
  });
}
function getUserByEmail(email,callback){
    console.log(email);
    connection.query('SELECT * FROM users WHERE email=?',[email],(error,results)=>{
        if (error) throw error;
        console.log(results);
        callback(results[0]);
    });
}
function createUser(name,email,password,role, callback) {
  connection.query('INSERT INTO users (name,email,password,role) values (?,?,?,?)', [name,email,password,role], (error, results) => {
    if (error) {
        console.log(error);
        // throw new Error(`An error occurred: ${error}`);
    }    
    console.log(results);
    callback(results.insertId);
  });
}
function updateUser(userId, updatedUser, callback) {
  connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (error) => {
    if (error) throw error;
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
  deleteUser,
};
