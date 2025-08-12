const express = require('express');
const authController = require('../controllers/authcontroller');
const authRouter = express.Router();
// const verifyToken = require("../middlewares/verify-roles");


authRouter.get('/userlist', authController.userlist);
authRouter.get('/singleuserlist/(:id)', authController.singleuserlist);
// authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/doctorlogin', authController.doctorlogin);
authRouter.post('/registerdoctor', authController.registerDoctor);
authRouter.delete('/deleteuser/(:id)', authController.deleteuser);
authRouter.put('/updateuser/(:id)', authController.updateuser);

authRouter.post('/sendotp', authController.sendOTP);
authRouter.post('/verifyotp', authController.verifyOTP);



module.exports = authRouter;