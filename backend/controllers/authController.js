const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/emailSender')
require('dotenv').config();
const db = require('../config/db');

// const util = require('util');
const { hash } = require('crypto');
// const query = util.promisify(db.query).bind(db);


// Get all users
exports.userlist = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, dateofbirth, gender, mobilenumber FROM patients'
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single user by ID
exports.singleuserlist = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT * FROM patients WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows);

  } catch (error) {
    console.error("SINGLE USER ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


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
exports.updateuser = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      'UPDATE patients SET ? WHERE id = ?',
      [req.body, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      result
    });

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
};


// Delete user
exports.deleteuser = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      'DELETE FROM patients WHERE id = ?',
      [id]
    );

    res.status(200).json({
      message: "User deleted successfully",
      result
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: 'Mobile number/email and password are required'
      });
    }

    const [rows] = await db.query(
      'SELECT * FROM patients WHERE mobilenumber = ? OR email = ?',
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid mobile number/email or password'
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid mobile number/email or password'
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: 'Login successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobilenumber: user.mobilenumber
      },
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
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


exports.doctorlogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Mobile number/email and password are required",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM doctor WHERE mobilenumber = ? OR email = ?",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid mobile number/email or password",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid mobile number/email or password",
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobilenumber: user.mobilenumber,
      },
      token,
    });

  } catch (error) {
    console.error("DOCTOR LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
    try {
        const { name, email, mobilenumber, gender, dateofbirth, password } = req.body;

        const hashpassword = await bcrypt.hash(password, 10);

        const [existingEmail] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
        if (existingEmail.length > 0) {
            return res.json({ status: 200, error: null, message: "Email already exists" });
        }

        const [existingMobile] = await db.query('SELECT * FROM patients WHERE mobilenumber = ?', [mobilenumber]);
        if (existingMobile.length > 0) {
            return res.json({ status: 200, error: null, message: "Mobile Number already exists" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const userData = JSON.stringify({ name, email, mobilenumber, gender, dateofbirth, hashpassword });

        await db.query(`INSERT INTO temp_registration_otp (email, otp, user_data, created_at, expires_at) VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE))`,[email, otp, userData]);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verify your Email - OTP",
            text: `Your OTP is: ${otp}. Valid for 10 minutes.`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "OTP sent to email. Please verify." });
    } catch (error) {
        console.error("sendOTP error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM temp_registration_otp WHERE email = ? AND otp = ? AND expires_at > NOW()",
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const userData = JSON.parse(rows[0].user_data);

    await db.query(
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

    await db.query("DELETE FROM temp_registration_otp WHERE email = ?", [email]);

    res.json({ message: "Registration successful" });

  } catch (error) {
    console.error("verifyOTP error FULL:", error);
    res.status(500).json({ message: error.message });
  }
};



// Update Doctor
exports.updatedoctor = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      'UPDATE doctor SET ? WHERE id = ?',
      [req.body, id]
    );

    res.status(200).json({
      message: "Doctor updated successfully",
      result
    });

  } catch (error) {
    console.error("UPDATE DOCTOR ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// Get single user by ID
exports.singledoctorlist = async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await db.query(
      'SELECT * FROM doctor WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    console.error("SINGLE DOCTOR ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
