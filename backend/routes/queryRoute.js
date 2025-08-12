const express = require('express');
const queryController = require('../controllers/queryController');
const queryRouter = express.Router();

queryRouter.post('/contact', queryController.contact);
queryRouter.get('/contactlist', queryController.contactlist);
queryRouter.get('/singlecontactlist/(:mobilenumber)', queryController.singlecontactlist);
queryRouter.delete('/deletequery/(:id)', queryController.deletequery);

module.exports = queryRouter;