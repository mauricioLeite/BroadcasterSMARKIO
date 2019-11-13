const mysql = require('mysql2');
const Comments = require('./Comments')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});
 
connection.query("CREATE DATABASE broadcaster", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

Comments.sync({force: true})