const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./config/db');

// Only allow your frontend domain
const corsOptions = {
  origin: [
    'https://medicare.razasoftwares.in',
    'http://localhost:3050'
  ],
  credentials: true
};


// Use CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => { 
    res.send('Welcome to the backend of the MediCare+');
});
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
});

// Start server
const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`Server has started at ${port}`);
});
