const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const router = express.Router();
router.get('/userlist', authcontroller.userlist);
router.get('/singleuserlist/(:id)', authcontroller.singleuserlist);
router.post('/registration', authcontroller.registration);
router.post('/login', authcontroller.login);
router.post('/doctorlogin', authcontroller.doctorlogin);
router.post('/contact', authcontroller.contact);
router.get('/contactlist', authcontroller.contactlist);
router.get('/singlecontactlist/(:mobilenumber)', authcontroller.singlecontactlist);
router.post('/appointment', authcontroller.appointment);
router.get('/appointmentlist', authcontroller.appointmentlist);
router.get('/singleappointmentlist/(:mobilenumber)', authcontroller.singleappointmentlist);
router.delete('/deleteuser/(:id)', authcontroller.deleteuser);
router.put('/updateuser/(:id)', authcontroller.updateuser);

module.exports = router;