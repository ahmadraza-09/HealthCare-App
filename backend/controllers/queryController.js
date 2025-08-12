const db = require('../config/db');

// Add a new query
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

// Show all queries
exports.contactlist = (request, response) => {
    db.query('SELECT * FROM contact', [], (error, contactData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": contactData }));
        }
    })
}

// Show single query by mobile number
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

// Delete Query
exports.deletequery = (request, response) => {
    const id = request.params.id;
    db.query('delete from contact where id= ?', [id], (error, querydata) => {
        if (error) {
            response.send(JSON.stringify({ "status": 200, "error": null }))
        } else {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": querydata }))
        }
    })
}