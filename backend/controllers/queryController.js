const db = require('../config/db')

// Add new query
exports.contact = async (req, res) => {
  try {
    // console.log("Contact API hit");

    const { name, email, mobilenumber, message } = req.body;

    if (!name || !email || !mobilenumber || !message) {
      return res.status(400).json({
        message: 'Please fill the form'
      });
    }

    const today = new Date().toISOString().split('T')[0];

    const [rows] = await db.query(
      'SELECT id FROM contact WHERE (email = ? OR mobilenumber = ?) AND DATE(created_at) = ?',
      [email, mobilenumber, today]
    );

    if (rows.length > 0) {
      return res.status(409).json({
        message: 'You have already submitted a query today'
      });
    }

    await db.query(
      'INSERT INTO contact (name, email, mobilenumber, message, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, mobilenumber, message]
    );

    res.status(200).json({
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Show all queries
exports.contactlist = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact');
    res.status(200).json(rows);
  } catch (error) {
    console.error("CONTACT LIST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// Show single query by mobile number
exports.singlecontactlist = async (req, res) => {
  try {
    const mobilenumber = req.params.mobilenumber;

    const [rows] = await db.query(
      'SELECT * FROM contact WHERE mobilenumber = ?',
      [mobilenumber]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No contact found' });
    }

    res.status(200).json(rows);

  } catch (error) {
    console.error("SINGLE CONTACT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



// Delete Query
exports.deletequery = async (req, res) => {
  try {
    const id = req.params.id;

    await db.query('DELETE FROM contact WHERE id = ?', [id]);

    res.status(200).json({ message: 'Deleted successfully' });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

