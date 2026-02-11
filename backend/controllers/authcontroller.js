const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/emailSender')
require('dotenv').config();
const db = require('../config/db');

const util = require('util');
const { hash } = require('crypto');
const query = util.promisify(db.query).bind(db);


// Get all users
exports.userlist = (request, response) => {
    db.query('SELECT id, name, email, dateofbirth, gender, mobilenumber FROM patients', [], (error, result) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": result }));
        }
    })
}

// Get single user by ID
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

// Registration
// exports.registration = async (request, response) => {
//     const { name, email, dateofbirth, gender, mobilenumber, password } = request.body;
//     let hashpassword = await md5(password)
//     // console.log(hashpassword);
//     db.query('select * from patients where email= ?', [email], (error, patientData) => {

//         if (patientData != '') {
//             response.send(JSON.stringify({ "status": 200, "error": null, "message": "Email already exists" }));
//         } else {
//             db.query('SELECT * FROM patients WHERE mobilenumber = ?', [mobilenumber], (error, patientData) => {
//                 if (patientData != '') {
//                     response.send(JSON.stringify({ "status": 200, "error": null, "message": "Mobile Number already exists" }));
//                 } else {
//                     db.query('INSERT INTO patients SET ?', { name: name, email: email, gender: gender, dateofbirth: dateofbirth, mobilenumber: mobilenumber, password: hashpassword }, async (error, patientData) => {
//                         if (error) {
//                             response.send(JSON.stringify({ "status": 500, "error": error }));
//                         } else {

//                             // Sending Welcome Email
//                             const mailOptions = {
//                                 from: process.env.SENDER_EMAIL,
//                                 to: email,
//                                 subject: 'Welcome to MediCare+ ',
//                                 text: `Hello ${name},\n\nThank you for registering with us. We are excited to have you on board!\n\nBest regards,\nMediCare+ Team`
//                             }

//                             await transporter.sendMail(mailOptions);

//                             response.send(JSON.stringify({ "status": 200, "error": null, "message": patientData }));
//                         }
//                     });
//                 }
//             });
//         }

//     })

// }

// Update user
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

// Delete user
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

exports.login = async (request, response) => {
    try {
        const { identifier, password } = request.body;

        if (!identifier || !password) {
            return response.status(400).json({
                status: 400,
                error: "Missing Fields",
                message: 'Mobile number/email and password are required'
            });
        }

        // Pehle user ko DB se fetch karo identifier ke basis pe
        db.query(
            'SELECT * FROM patients WHERE mobilenumber = ? OR email = ?',
            [identifier, identifier],
            async (error, patientData) => {
                if (error) {
                    return response.status(500).json({
                        status: 500,
                        error: error,
                        message: 'Internal server error'
                    });
                }

                if (patientData.length === 0) {
                    return response.status(401).json({
                        status: 401,
                        error: "Invalid Credentials",
                        message: 'Invalid mobile number/email or password'
                    });
                }

                const user = patientData[0];

                // Password compare karo yahan asynchronously
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return response.status(401).json({
                        status: 401,
                        error: "Invalid Credentials",
                        message: 'Invalid mobile number/email or password'
                    });
                }

                // JWT generate karo
                const token = jwt.sign(
                    { userId: user.id, role: "patient" },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                response.status(200).json({
                    status: 200,
                    error: null,
                    message: 'Login successfully',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        mobilenumber: user.mobilenumber,
                        // sensitive info password hata ke bhejo
                    },
                    token: token
                });
            }
        );
    } catch (error) {
        console.error("Login error:", error);
        response.status(500).json({
            status: 500,
            error: error.message,
            message: "Internal server error"
        });
    }
};

exports.verifyToken = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true, user: decoded });
    } catch (error) {
        res.json({ valid: false });
    }
};

exports.logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    res.json({ message: "Logged out successfully" });
}


exports.doctorlogin = (request, response) => {
    const { identifier, password } = request.body;

    if (!identifier || !password) {
        return response.status(400).json({
            status: 400,
            error: "Missing Fields",
            message: 'Mobile number/email and password are required'
        });
    }

    // Pehle user ko identifier se fetch karo
    db.query(
        'SELECT * FROM doctor WHERE mobilenumber = ? OR email = ?',
        [identifier, identifier],
        async (error, doctorData) => {
            if (error) {
                return response.status(500).json({
                    status: 500,
                    error: error,
                    message: 'Internal server error'
                });
            }

            if (doctorData.length === 0) {
                return response.status(401).json({
                    status: 401,
                    error: "Invalid Credentials",
                    message: 'Invalid mobile number/email or password'
                });
            }

            const user = doctorData[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return response.status(401).json({
                    status: 401,
                    error: "Invalid Credentials",
                    message: 'Invalid mobile number/email or password'
                });
            }

            const token = jwt.sign(
                { userId: user.id, role: "doctor" },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            response.status(200).json({
                status: 200,
                error: null,
                message: 'Login successfully',
                user: user,
                token: token
            });
        }
    );

};

exports.registerDoctor = (req, res) => {
    const { name, email, mobilenumber, password } = req.body;

    if (!name || !email || !mobilenumber || !password) {
        return res.status(400).json({
            status: 400,
            error: "Missing Fields",
            message: "Please fill all required fields"
        });
    }

    // Check if user exists
    db.query('SELECT * FROM doctor WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password asynchronously (returns Promise)
        bcrypt.hash(password, 10).then((hashedPassword) => {
            // Insert user after password is hashed
            db.query(
                'INSERT INTO doctor (name, email, mobilenumber, password, created_at) VALUES (?, ?, ?, ?, NOW())',
                [name, email, mobilenumber, hashedPassword],
                (err2, results2) => {
                    if (err2) {
                        return res.status(500).json({ message: err2.message });
                    }

                    return res.status(201).json({
                        status: 201,
                        error: null,
                        message: "Registration successful"
                    });
                }
            );
        }).catch((hashErr) => {
            return res.status(500).json({ message: hashErr.message });
        });
    });
};

// Otp Based Login
exports.sendOTP = async (req, res) => {
    const { name, email, mobilenumber, gender, dateofbirth, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    db.query('select * from patients where email= ?', [email], (error, patientData) => {

        if (patientData != '') {
            res.send(JSON.stringify({ "status": 200, "error": null, "message": "Email already exists" }));
        } else {
            db.query('SELECT * FROM patients WHERE mobilenumber = ?', [mobilenumber], async (error, patientData) => {
                if (patientData != '') {
                    res.send(JSON.stringify({ "status": 200, "error": null, "message": "Mobile Number already exists" }));
                } else {
                    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

                    const userData = JSON.stringify({ name, email, mobilenumber, gender, dateofbirth, hashpassword });

                    // Save to temp table
                    await db.query(
                        "INSERT INTO temp_registration_otp (email, otp, user_data, created_at) VALUES (?, ?, ?, NOW())",
                        [email, otp, userData]
                    );

                    const mailOptions = {
                        from: process.env.SENDER_EMAIL,
                        to: email,
                        subject: "Verify your Email - OTP",
                        text: `Your OTP is: ${otp}. Valid for 10 minutes.`
                    }

                    await transporter.sendMail(mailOptions);

                    res.json({ message: "OTP sent to email. Please verify." });
                }
            });
        }

    })


};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const rows = await query(
            "SELECT * FROM temp_registration_otp WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) <= 10",
            [email, otp]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const userData = JSON.parse(rows[0].user_data);

        await query(
            "INSERT INTO patients (name, email, mobilenumber, gender, dateofbirth, password, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
            [
                userData.name,
                userData.email,
                userData.mobilenumber,
                userData.gender,
                userData.dateofbirth,
                userData.hashpassword,
            ]
        );

        await query("DELETE FROM temp_registration_otp WHERE email = ?", [email]);

        // Sending Welcome Email
        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: userData.email,
        //     subject: 'Welcome to MediCare+ ',
        //     text: `Hello ${userData.name},\n\nThank you for registering with us. We are excited to have you on board!\n\nBest regards,\nMediCare+ Team`
        // }

        // await transporter.sendMail(mailOptions);

        res.json({ message: "Registration successful" });
    } catch (error) {
        console.error("verifyOTP error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Doctor
exports.updatedoctor = (request, response) => {
    const id = request.params.id;
    db.query('update doctor set ? where id= ?', [request.body, id], (error, userdata) => {
        if (error) {
            response.send(JSON.stringify({ "status": 200, "error": null }))
        } else {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": userdata }))
        }
    })
}

// Get single user by ID
exports.singledoctorlist = (request, response) => {
    const id = { id: request.params.id };
    db.query('SELECT * FROM doctor WHERE ?', [id], (error, result) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": result }));
        }
    })
}