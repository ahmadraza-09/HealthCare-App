const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const router = express.Router();

router.get('/userlist', authcontroller.userlist);
router.get('/singleuserlist/(:id)', authcontroller.singleuserlist);
router.post('/registration', authcontroller.registration);

module.exports = router;