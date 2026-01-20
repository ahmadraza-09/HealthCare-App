const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
    }
});

/* ================= REGISTER OTP ================= */

exports.sendOTP = (req, res) => {
    const { name, email, mobilenumber, gender, dateofbirth, password } = req.body;

    if (!email || !password || !mobilenumber) {
        return res.status(400).json({ message: "Missing fields" });
    }

    bcrypt.hash(password, 10, (err, hashpassword) => {

        db.query('SELECT * FROM patients WHERE email=?', [email], (e1, r1) => {
            if (r1.length > 0) {
                return res.json({ message: "Email already exists" });
            }

            db.query('SELECT * FROM patients WHERE mobilenumber=?', [mobilenumber], (e2, r2) => {
                if (r2.length > 0) {
                    return res.json({ message: "Mobile already exists" });
                }

                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const userData = JSON.stringify({
                    name, email, mobilenumber, gender, dateofbirth, hashpassword
                });

                db.query(
                    'INSERT INTO temp_registration_otp (email, otp, user_data, created_at) VALUES (?,?,?,NOW())',
                    [email, otp, userData],
                    () => {
                        transporter.sendMail({
                            from: process.env.SENDER_EMAIL,
                            to: email,
                            subject: 'OTP Verification',
                            text: `Your OTP is ${otp}`
                        });

                        res.json({ message: "OTP sent successfully" });
                    }
                );
            });
        });
    });
};

/* ================= VERIFY OTP ================= */

exports.verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    db.query(
        `SELECT * FROM temp_registration_otp 
         WHERE email=? AND otp=? 
         AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) <= 10`,
        [email, otp],
        (err, rows) => {

            if (rows.length === 0) {
                return res.json({ message: "Invalid or expired OTP" });
            }

            const user = JSON.parse(rows[0].user_data);

            db.query(
                'INSERT INTO patients (name,email,mobilenumber,gender,dateofbirth,password,created_at) VALUES (?,?,?,?,?,?,NOW())',
                [
                    user.name,
                    user.email,
                    user.mobilenumber,
                    user.gender,
                    user.dateofbirth,
                    user.hashpassword
                ],
                () => {
                    db.query('DELETE FROM temp_registration_otp WHERE email=?', [email]);
                    res.json({ message: "Registration successful" });
                }
            );
        }
    );
};

/* ================= LOGIN ================= */

exports.login = (req, res) => {
    const { identifier, password } = req.body;

    db.query(
        'SELECT * FROM patients WHERE email=? OR mobilenumber=?',
        [identifier, identifier],
        (err, users) => {

            if (users.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = users[0];

            bcrypt.compare(password, user.password, (err, match) => {
                if (!match) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }

                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        mobilenumber: user.mobilenumber
                    }
                });
            });
        }
    );
};
