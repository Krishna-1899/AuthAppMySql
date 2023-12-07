const express = require('express');
const app= express();
require('dotenv').config();
const connection  = require("./config/MysqlConnection");
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});
connection.query(`SHOW DATABASES`,function(err,result){
    if (err) 
        console.log(`Error executing the query - ${err}`)
    else
        console.log("Result: ", result)
});

const PORT = process.env.PORT || 4000;
app.use(express.json());

const user = require("./Routes/user");
app.use("/api/v1",user);
app.listen(PORT,()=>{
    console.log(`App is listing at ${PORT}`)
});
