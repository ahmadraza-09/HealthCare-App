const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const appointmentRouter = express.Router();
// const verifyToken = require("../middlewares/verify-roles");



appointmentRouter.post('/appointment', appointmentController.appointment);
appointmentRouter.get('/appointmentlist', appointmentController.appointmentlist);
appointmentRouter.get('/singleappointmentlist/(:mobilenumber)', appointmentController.singleappointmentlist);
appointmentRouter.delete('/deleteappointment/(:id)', appointmentController.deleteAppointment);





module.exports = appointmentRouter;