const mysql = require('mysql');
const md5 = require('md5')


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
    const patientId = {id:request.params.id};
    db.query('SELECT * FROM patients WHERE ?', [patientId], (error, result) => {
        if (error) {
            response.send(JSON.stringify({"status": '404', "error": error}));
        }else {
            response.send(JSON.stringify({"status": '200', "error":'', "message": result}));
        }
    })
}

exports.registration = async (request,response) => {
    const {name,dateofbirth,gender,mobilenumber} = request.body;
    db.query('select * from patients where mobilenumber= ?',[mobilenumber],(error,patientData)=>{
        
       if (patientData != '') {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": "Mobile Number already exists" }));
       }else {
            db.query('INSERT INTO patients SET ?', { name: name, dateofbirth: dateofbirth, gender: gender, mobilenumber: mobilenumber}, (error, patientData) => {
                if (error) {
                    response.send(JSON.stringify({ "status": 500, "error": error }));
                } else {
                    response.send(JSON.stringify({ "status": 200, "error": null, "message": patientData }));
                }
            });
       }
    
    })

}

exports.login = (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Mobile number/email and password are required' });
    }

    db.query('SELECT * FROM users WHERE (mobile_number = ? OR email = ?) AND password = ?', [identifier, identifier, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid mobile number/email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    });
};
