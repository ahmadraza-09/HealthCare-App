const db = require('../config/db');

// Book Appointment 
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

// Get Appointment List
exports.appointmentlist = (request, response) => {
    db.query('SELECT * FROM appointment', [], (error, appointmentData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": appointmentData }));
        }
    })
}

// Get Single Appointment by Mobile Number
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