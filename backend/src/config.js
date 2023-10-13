const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'scheduler',
    password: 'password',
})

module.exports = connection.promise()