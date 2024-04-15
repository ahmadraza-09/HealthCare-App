const expires = require('expires');
const authController = require('../controllers/auth');
const router = expires.Router();

router.post('/registration', authController.registeration);

module.exports = router;