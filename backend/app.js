const express = require('express');
const mysql = require('mysql');
const app = express();
require('dotenv').config();
// app.use('/auth',require('./routes/auth'));

const db = mysql.createConnection ({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

db.connect((error) => {
    if (error) {
        console.log(error.message);
    }else {
        console.log('Database connected successfully');
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to the HealthCare API');
})

const port = 3050;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }else {
        console.log(`Server has started at ${port}`);
    }
});