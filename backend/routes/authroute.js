const express = require('express');
const authcontroller = require('../controllers/authcontroller');
const router = express.Router();

router.get('/userlist', authcontroller.userlist);
router.get('/singleuserlist/(:patient_id)', authcontroller.singleuserlist);

module.exports = router;