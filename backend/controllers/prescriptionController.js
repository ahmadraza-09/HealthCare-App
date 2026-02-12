const db = require('../config/db');

// Add a new prescription
exports.addPrescription = async (req, res) => {
  try {
    const {
      patient_name,
      email,
      phone_number,
      date_of_birth,
      concern,
      address,
      message
    } = req.body;

    if (!patient_name || !phone_number || !date_of_birth || !concern || !address) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    await db.query(
      `INSERT INTO prescription 
      (patient_name, email, phone_number, date_of_birth, concern, address, message) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [patient_name, email, phone_number, date_of_birth, concern, address, message]
    );

    res.status(201).json({
      message: "Prescription added successfully"
    });

  } catch (error) {
    console.error("ADD PRESCRIPTION ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Show all prescriptions
exports.showAllPrescription = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM prescription');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete Prescription
exports.deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM prescription WHERE prescription_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No prescription found with this ID"
      });
    }

    res.status(200).json({
      message: "Prescription deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
