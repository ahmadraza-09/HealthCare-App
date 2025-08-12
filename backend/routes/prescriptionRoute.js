const express = require('express');
const prescriptionController = require('../controllers/prescriptionController');
const prescriptionRouter = express.Router();

prescriptionRouter.post('/addprescription', prescriptionController.addPrescription);
prescriptionRouter.get('/showallprescription', prescriptionController.showAllPrescription);
prescriptionRouter.delete('/deleteprescription/(:id)', prescriptionController.deletePrescription);

module.exports = prescriptionRouter;