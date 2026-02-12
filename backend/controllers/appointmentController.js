const db = require('../config/db');

// Book Appointment 
exports.appointment = async (req, res) => {
  try {
    const { name, dateofbirth, gender, concern, mobilenumber } = req.body;

    if (!name || !dateofbirth || !gender || !concern || !mobilenumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const today = new Date().toISOString().split('T')[0];

    const [rows] = await db.query(
      `SELECT COUNT(*) AS appointmentCount 
       FROM appointment 
       WHERE mobilenumber = ? AND DATE(created_at) = ?`,
      [mobilenumber, today]
    );

    if (rows[0].appointmentCount >= 5) {
      return res.status(429).json({
        message: 'Appointment limit reached for today. Try again tomorrow.'
      });
    }

    await db.query(
      `INSERT INTO appointment 
       (name, dateofbirth, gender, concern, mobilenumber, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, dateofbirth, gender, concern, mobilenumber]
    );

    res.status(201).json({
      message: 'Appointment created successfully'
    });

  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Appointment List
exports.appointmentlist = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM appointment');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get Single Appointment by Mobile Number
exports.singleappointmentlist = async (req, res) => {
  try {
    const { mobilenumber } = req.params;

    if (!mobilenumber) {
      return res.status(400).json({
        message: 'Mobile number parameter is missing.'
      });
    }

    const [rows] = await db.query(
      'SELECT * FROM appointment WHERE mobilenumber = ?',
      [mobilenumber]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'No appointments found for this mobile number.'
      });
    }

    res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Appointment ID parameter is missing.'
      });
    }

    const [result] = await db.query(
      'DELETE FROM appointment WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'No appointment found with this ID.'
      });
    }

    res.status(200).json({
      message: 'Appointment deleted successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
