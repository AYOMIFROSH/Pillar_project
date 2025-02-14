// csvRoutes.js
const express = require('express');
const router = express.Router();
const csvController = require('../firebase/csvController');
const { authenticate } = require('../firebase/firebaseMiddleware');

// Apply authentication middleware to all routes in this router
router.use(authenticate);

// Create a new CSV record
router.post('/csv', csvController.createCsv);

// Get all CSV records for the authenticated user
router.get('/csv', csvController.getCsvs);

// Get a specific CSV record by its ID
router.get('/csv/:id', csvController.getCsvById);

// Update a CSV record by its ID
router.put('/updated/csv/:id', csvController.updateCsv);

router.put('/csv/row/:rowId', csvController.updateCsvRow);

router.delete('/csv/deleterow/:rowId', csvController.deleteCsvRow);

// Bulk delete CSV records (expects an array of IDs in the request body)
router.delete('/csv/deletebulkrows', csvController.bulkDeleteCsvRows);

module.exports = router;

