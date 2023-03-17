var fullName = document.getElementById('fullName')
var studentID = document.getElementById('password')
var username = document.getElementById('username')
var classification = document.getElementById('classification')
var gpa = document.getElementById('gpa')
const { Connection, Request } = require("tedious");


// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "SA", 
            password: "2527Bulldogs%" 
        },
        type: "default"
    },
    server: "localhost", 
    options: {
        database: "master", 
        encrypt: true
    }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        queryDatabase();
    }
});