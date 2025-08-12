const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require('./config/db');


app.get('/', (req, res) => {
    res.send('Welcome to the backend of the MediCare+');
});

// Importing routes
app.use('/auth', require('./routes/authRoute'));
app.use('/appointment', require('./routes/appointmentRoute'));
app.use('/prescription', require('./routes/prescriptionRoute'));
app.use('/query', require('./routes/queryRoute'));

// Database connection
db.connect((error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log('Database connected successfully');
    }
})

// Starting the server
const port = 3050;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server has started at ${port}`);
    }
});