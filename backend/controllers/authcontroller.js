const mysql = require('mysql');

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

exports.userlist = (request, response) => {
    db.query('SELECT * FROM patients', [], (error, result) => {
        if (error) {
            response.send(JSON.stringify({"status": '404', "error": error}));
        }else {
            response.send(JSON.stringify({"status": '200', "error":'', "message": result}));
        }
    })
}

exports.singleuserlist = (request, response) => {
    const patientId = request.params.id;
    db.query('SELECT * FROM patients WHERE ?', [patientId], (error, result) => {
        if (error) {
            response.send(JSON.stringify({"status": '404', "error": error}));
        }else {
            response.send(JSON.stringify({"status": '200', "error":'', "message": result}));
        }
    })
}
