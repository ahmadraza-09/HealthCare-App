const mysql = require('mysql');
const md5 = require('md5')
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.userlist = (request, response) => {
    db.query('SELECT id, name, email, dateofbirth, gender, mobilenumber FROM patients', [], (error, result) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": result }));
        }
    })
}

exports.singleuserlist = (request, response) => {
    const patientId = { id: request.params.id };
    db.query('SELECT * FROM patients WHERE ?', [patientId], (error, result) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": result }));
        }
    })
}

exports.registration = async (request, response) => {
    const { name, email, dateofbirth, gender, mobilenumber, password } = request.body;
    let hashpassword = await md5(password)
    // console.log(hashpassword);
    db.query('select * from patients where email= ?', [email], (error, patientData) => {

        if (patientData != '') {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": "Email already exists" }));
        } else {
            db.query('SELECT * FROM patients WHERE mobilenumber = ?', [mobilenumber], (error, patientData) => {
                if (patientData != '') {
                    response.send(JSON.stringify({ "status": 200, "error": null, "message": "Mobile Number already exists" }));
                } else {
                    db.query('INSERT INTO patients SET ?', { name: name, email: email, gender: gender, dateofbirth: dateofbirth, mobilenumber: mobilenumber, password: hashpassword }, (error, patientData) => {
                        if (error) {
                            response.send(JSON.stringify({ "status": 500, "error": error }));
                        } else {
                            response.send(JSON.stringify({ "status": 200, "error": null, "message": patientData }));
                        }
                    });
                }
            });
        }

    })

}

exports.updateuser = (request, response) => {
    const id = request.params.id;
    db.query('update patients set ? where id= ?', [request.body, id], (error, userdata) => {
        if (error) {
            response.send(JSON.stringify({ "status": 200, "error": null }))
        } else {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": userdata }))
        }
    })
}

exports.deleteuser = (request, response) => {
    var id = request.params.id;
    db.query('delete from patients where id= ?', [id], (error, userdata) => {
        if (error) {
            response.send(JSON.stringify({ "status": 200, "error": null }))
        } else {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": userdata }))
        }
    })
}

exports.login = (request, response) => {
    const { identifier, password } = request.body;

    if (!identifier || !password) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'Mobile number/email and password are required' }));
    }

    const hashedPassword = md5(password);

    db.query('SELECT * FROM patients WHERE (mobilenumber = ? OR email = ?) AND password = ?', [identifier, identifier, hashedPassword], (error, patientData) => {
        if (error) {
            return response.send(JSON.stringify({ "status": 500, "error": error, "message": 'Internal server error' }));
        }
        if (patientData.length === 0) {
            return response.send(JSON.stringify({ "status": 401, "error": "Invalid Credentials", "message": 'Invalid mobile number/email or password' }));
        }
        const token = jwt.sign({ userId: patientData[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.send(JSON.stringify({ "status": 200, "error": null, "message": 'Login successfully', "user": patientData[0], "token": token }));
    });
};

exports.doctorlogin = (request, response) => {
    const { identifier, password } = request.body;

    if (!identifier || !password) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'Mobile number/email and password are required' }));
    }

    db.query('SELECT * FROM doctor WHERE (mobilenumber = ? OR email = ?) AND password = ?', [identifier, identifier, password], (error, doctorData) => {
        if (error) {
            return response.send(JSON.stringify({ "status": 500, "error": error, "message": 'Internal server error' }));
        }
        if (doctorData.length === 0) {
            return response.send(JSON.stringify({ "status": 401, "error": "Invalid Credentials", "message": 'Invalid mobile number/email or password' }));
        }
        const token = jwt.sign({ userId: doctorData[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.send(JSON.stringify({ "status": 200, "error": null, "message": 'Login successfully', "user": doctorData[0], "token": token }));
    });
};

exports.contact = (req, res) => {
    const { name, email, mobilenumber, message } = req.body;

    if (!name || !email || !mobilenumber || !message) {
        return res.send(JSON.stringify({ "status": 401, "error": "Form Not Filled", "message": "Please fill the form" }));
    }

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    db.query(`SELECT * FROM contact WHERE (email = ? OR mobilenumber = ?) AND DATE(created_at) = ?`, [email, mobilenumber, dateString], (error, contactData) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ "message": "Internal server error" });
        }

        if (contactData.length > 0) {
            return res.send(JSON.stringify({ "status": 409, "error": "Allready Submitted", "message": "You have already submitted a query today. Please try again tomorrow." }));
        } else {

            db.query('INSERT INTO contact SET ?', { name, email, mobilenumber, message }, (error, contactData) => {
                if (error) {
                    console.error(error);
                    return res.send(JSON.stringify({ "status": 500, "error": "error", "message": "Internal server error" }));
                }
                return res.send(JSON.stringify({ "status": 200, "error": '', "message": "Contact form submitted successfully", "contact": contactData }));
            });
        }
    });
};

exports.contactlist = (request, response) => {
    db.query('SELECT * FROM contact', [], (error, contactData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": contactData }));
        }
    })
}

exports.singlecontactlist = (request, response) => {
    const mobilenumber = request.params.mobilenumber;

    if (!mobilenumber) {
        return response.status(400).json({ status: '400', error: 'Mobile number parameter is missing.' });
    }

    db.query('SELECT * FROM contact WHERE mobilenumber = ?', [mobilenumber], (error, contactData) => {
        if (error) {
            console.error('Database error: ' + error.message);
            response.status(500).json({ status: '500', error: 'Internal server error' });
        } else if (contactData.length === 0) {
            response.status(404).json({ status: '404', error: 'No contact found with the provided mobile number.' });
        } else {
            response.status(200).json({ status: '200', error: '', message: contactData });
        }
    });
}

exports.appointment = (req, res) => {
    const { name, dateofbirth, gender, concern, mobilenumber } = req.body;

    if (!name || !dateofbirth || !gender || !concern || !mobilenumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    db.query(`SELECT COUNT(*) AS appointmentCount FROM appointment WHERE mobilenumber = ? AND DATE(created_at) = ?`, [mobilenumber, dateString], (error, appointmentData) => {
        if (error) {
            console.error('Database error: ' + error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (appointmentData[0].appointmentCount >= 5) {
            return res.status(429).json({ message: 'Appointment limit reached for today. Try again tomorrow.' });
        } else {
            db.query('INSERT INTO appointment SET ?', { name, dateofbirth, gender, concern, mobilenumber }, (error, appointmentData) => {
                if (error) {
                    console.error('Failed to insert into appointment: ' + error.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                res.status(201).json({ message: 'Appointment created successfully', "Appointment Data": appointmentData });
            });
        }
    });
};

exports.appointmentlist = (request, response) => {
    db.query('SELECT * FROM appointment', [], (error, appointmentData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": appointmentData }));
        }
    })
}

exports.singleappointmentlist = (request, response) => {
    const mobilenumber = request.params.mobilenumber;

    if (!mobilenumber) {
        return response.status(400).json({ status: '400', error: 'Mobile number parameter is missing.' });
    }

    db.query('SELECT * FROM appointment WHERE mobilenumber = ?', [mobilenumber], (error, appointmentData) => {
        if (error) {
            console.error('Database error: ' + error.message);
            response.status(500).json({ status: '500', error: 'Internal server error' });
        } else if (appointmentData.length === 0) {
            response.status(404).json({ status: '404', error: 'No appointments found for the provided mobile number.' });
        } else {
            response.status(200).json({ status: '200', error: '', message: appointmentData });
        }
    });
}

// Prescriptions
exports.addPrescription = (req, res) => {
    const { patient_name, email, phone_number, date_of_birth, concern, address, message } = req.body

    if (!patient_name || !phone_number || !date_of_birth || !concern || !address) {
        res.send(JSON.stringify({ status: '400', error: "Field Not Provided", message: "All fields are required" }))
    }

    db.query(`INSERT INTO prescription (patient_name, email, phone_number, date_of_birth, concern, address, message) VALUES (?, ?, ?, ?, ?, ?, ?)`, [patient_name, email, phone_number, date_of_birth, concern, address, message], (error, result) => {
        if (error) {
            console.error('Failed to insert into prescription: ' + error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.send(JSON.stringify({ status: '201', message: result }));
    })
}

exports.showAllPrescription = (req, res) => {
    db.query('SELECT * FROM prescription', [], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ status: '404', error: error }));
        } else {
            res.send(JSON.stringify({ status: '200', error: '', message: result }));
        }
    })
}