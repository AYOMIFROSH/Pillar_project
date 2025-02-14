// csvController.js
const csvModel = require('../firebaseModel/csvModel');

/**
 * Create a new CSV record.
 * Expected body: { name: string, data: (array or object) }
 */
exports.createCsv = async (req, res) => {
  try {
    const { name, data } = req.body;
    if (!name || !data) {
      return res.status(400).json({ message: 'Name and data are required.' });
    }
    const userId = req.user.id;
    const newRecord = await csvModel.createCsvRecord({ userId, name, data });
    res.status(201).json({
      message: 'CSV record created successfully',
      csv: newRecord,
    });
  } catch (error) {
    console.error('Error creating CSV record:', error);
    res.status(500).json({ message: 'Server error while creating CSV record' });
  }
};

/**
 * Get all CSV records for the authenticated user.
 */
exports.getCsvs = async (req, res) => {
  try {
    const userId = req.user.id;
    const records = await csvModel.getCsvRecordsForUser(userId);
    res.json(records);
  } catch (error) {
    console.error('Error fetching CSV records:', error);
    res.status(500).json({ message: 'Server error while fetching CSV records' });
  }
};

/**
 * Get a single CSV record by its ID.
 */
exports.getCsvById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const record = await csvModel.getCsvRecordById(userId, id);
    if (!record) {
      return res.status(404).json({ message: 'CSV record not found' });
    }
    res.json(record);
  } catch (error) {
    console.error('Error fetching CSV record:', error);
    res.status(500).json({ message: 'Server error while fetching CSV record' });
  }
};

/**
 * Update a CSV record.
 * Expected body: may include { name, data }.
 */
exports.updateCsv = async (req, res) => {
  console.log('update hit')
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, data } = req.body;
    if (!name && !data) {
      return res
        .status(400)
        .json({ message: 'At least one field (name or data) is required for update.' });
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (data) updateData.data = data;
    const updatedRecord = await csvModel.updateCsvRecord(userId, id, updateData);
    if (!updatedRecord) {
      return res.status(404).json({ message: 'CSV record not found or unauthorized' });
    }
    res.json({
      message: 'CSV record updated successfully',
      csv: updatedRecord,
    });
  } catch (error) {
    console.error('Error updating CSV record:', error);
    res.status(500).json({ message: 'Server error while updating CSV record' });
  }
};

exports.updateCsvRow = async (req, res) => {
  console.log('update row hit');
  try {
    const userId = req.user.id;
    const { rowId } = req.params; // rowId is the UUID of the row to update
    const updateData = req.body; // use the entire request body as updateData
    console.log('Update request body :', updateData);
  
    if (!updateData || Object.keys(updateData).length === 0) {
      console.log('No update data provided');
      return res.status(400).json({ message: 'At least one field to update is required.' });
    }
  
    const updatedRecord = await csvModel.updateCsvRow(userId, rowId, updateData);
    if (!updatedRecord) {
      return res.status(404).json({ message: 'CSV row not found or unauthorized' });
    }
    res.json({
      message: 'CSV row updated successfully',
      csv: updatedRecord,
    });
  } catch (error) {
    console.error('Error updating CSV row:', error);
    res.status(500).json({ message: 'Server error while updating CSV row' });
  }
};

exports.deleteCsvRow = async (req, res) => {
  console.log('delete row hit');
  try {
    const userId = req.user.id;
    const { rowId } = req.params;
    const updatedRecord = await csvModel.deleteCsvRow(userId, rowId);
    if (!updatedRecord) {
      return res.status(404).json({ message: 'CSV row not found or unauthorized' });
    }
    res.json({
      message: 'CSV row deleted successfully',
      csv: updatedRecord,
    });
  } catch (error) {
    console.error('Error deleting CSV row:', error);
    res.status(500).json({ message: 'Server error while deleting CSV row' });
  }
};

/**
 * Bulk delete CSV records.
 * Expects an array of record IDs in the request body.
 */
exports.bulkDeleteCsvRows = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: 'No CSV row IDs provided for deletion.' });
    }
    await csvModel.bulkDeleteCsvRows(userId, ids);
    res.json({ message: 'CSV rows deleted successfully' });
  } catch (error) {
    console.error('Error bulk deleting CSV rows:', error);
    res.status(500).json({ message: 'Server error while deleting CSV rows' });
  }
};
