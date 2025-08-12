const db = require('../config/db');

// Add a new prescription
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

// Show all prescriptions
exports.showAllPrescription = (req, res) => {
    db.query('SELECT * FROM prescription', [], (error, result) => {
        if (error) {
            res.send(JSON.stringify({ status: '404', error: error }));
        } else {
            res.send(JSON.stringify({ status: '200', error: '', message: result }));
        }
    })
}

// Delete Prescription
exports.deletePrescription = (request, response) => {
    const id = request.params.id;
    db.query('delete from prescription where prescription_id= ?', [id], (error, prescriptiondata) => {
        if (error) {
            response.send(JSON.stringify({ "status": 200, "error": null }))
        } else {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": prescriptiondata }))
        }
    })
}