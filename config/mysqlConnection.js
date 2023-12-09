const mysql= require("mysql");
require("dotenv").config();
const connection=mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database:"demofromnode"
});
module.exports=connection;
