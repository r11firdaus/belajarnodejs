var mysql = require('mysql');

// db connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cobanodejs'
});

conn.connect(err => {
    if (err) throw err;
    console.log('db connection success');
});

module.exports = conn;