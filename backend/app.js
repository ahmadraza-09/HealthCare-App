const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const corsOptions = {
  origin: [
    'https://medicare.razasoftwares.in',
    'http://localhost:3050',
    'http://localhost:3000'
  ],
  credentials: true
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Welcome to the backend of the MediCare+')
})

app.use('/auth', require('./routes/authRoute'))
app.use('/appointment', require('./routes/appointmentRoute'))
app.use('/prescription', require('./routes/prescriptionRoute'))
app.use('/query', require('./routes/queryRoute'))

const port = process.env.PORT || 3050
app.listen(port, () => {
  console.log(`Server has started at ${port}`)
})
