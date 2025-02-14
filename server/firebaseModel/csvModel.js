// csvModel.js
const { db } = require('../config'); 
const { v4: uuidv4 } = require('uuid');

const collectionName = 'CsvRecords';

/**
 * Create a new CSV record.
 * @param {Object} csvData 
 */
const createCsvRecord = async (csvData) => {
  try {
    const recordData = {
      ...csvData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Use the id provided in csvData if available, or generate one
    const recordId = csvData.id || uuidv4();
    await db.collection(collectionName).doc(recordId).set(recordData);
    const docSnapshot = await db.collection(collectionName).doc(recordId).get();
    return { id: recordId, ...docSnapshot.data() };
  } catch (error) {
    console.error('Error creating CSV record:', error);
    throw error;
  }
};  

/**
 * Get all CSV records for a specific user.
 * @param {string} userId
 */
const getCsvRecordsForUser = async (userId) => {
  try {
    const snapshot = await db
      .collection(collectionName)
      .where('userId', '==', userId)
      .get();
    const records = [];
    snapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    return records;
  } catch (error) {
    console.error('Error fetching CSV records for user:', error);
    throw error;
  }
};

/**
 * Get a CSV record by ID for a specific user.
 * @param {string} userId
 * @param {string} recordId
 */
const getCsvRecordById = async (userId, recordId) => {
  try {
    const docRef = db.collection(collectionName).doc(recordId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return null;
    }
    const data = docSnapshot.data();
    if (data.userId !== userId) {
      return null;
    }
    return { id: docSnapshot.id, ...data };
  } catch (error) {
    console.error('Error getting CSV record by ID:', error);
    throw error;
  }
};

/**
 * Update a CSV record (only if it belongs to the given user).
 * @param {string} userId
 * @param {string} recordId
 * @param {Object} updateData - Fields to update (e.g. { name, data })
 */
const updateCsvRecord = async (userId, recordId, updateData) => {
  try {
    const docRef = db.collection(collectionName).doc(recordId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return null;
    }
    const data = docSnapshot.data();
    if (data.userId !== userId) {
      return null;
    }
    updateData.updatedAt = new Date();
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error('Error updating CSV record:', error);
    throw error;
  }
};

/**
 * Bulk delete CSV records (only those that belong to the given user).
 * @param {string} userId
 * @param {string[]} recordIds
 */
const bulkDeleteCsvRows = async (userId, rowIds) => {
  try {
    // Get all CSV records for the user
    const snapshot = await db
      .collection(collectionName)
      .where('userId', '==', userId)
      .get();

    for (const doc of snapshot.docs) {
      const recordData = doc.data();
      const dataRows = recordData.data;
      // Filter out rows that match the provided IDs
      const filteredRows = dataRows.filter((row) => !rowIds.includes(row.id));
      // If rows were removed, update the document
      if (filteredRows.length !== dataRows.length) {
        const updatedAt = new Date();
        await db.collection(collectionName).doc(doc.id).update({
          data: filteredRows,
          updatedAt,
        });
      }
    }
    return true;
  } catch (error) {
    console.error('Error bulk deleting CSV rows:', error);
    throw error;
  }
};

const updateCsvRow = async (userId, rowId, updateData) => {
  console.log('Model update hit')
  try {
    const snapshot = await db
      .collection(collectionName)
      .where('userId', '==', userId)
      .get();
    let updatedDocument = null;
    for (const doc of snapshot.docs) {
      const recordData = doc.data();
      const dataRows = recordData.data;
      const rowIndex = dataRows.findIndex((row) => row.id === rowId);
      if (rowIndex !== -1) {
        dataRows[rowIndex] = {
          ...dataRows[rowIndex],
          ...updateData,
        };
        const updatedAt = new Date();
        await db.collection(collectionName).doc(doc.id).update({
          data: dataRows,
          updatedAt,
        });
        updatedDocument = { id: doc.id, ...recordData, data: dataRows, updatedAt };
        break;
      }
    }
    return updatedDocument;
  } catch (error) {
    console.error('Error updating CSV row:', error);
    throw error;
  }
};

const deleteCsvRow = async (userId, rowId) => {
  console.log('Model delete row hit');
  try {
    const snapshot = await db
      .collection(collectionName)
      .where('userId', '==', userId)
      .get();
    let updatedDocument = null;
    for (const doc of snapshot.docs) {
      const recordData = doc.data();
      const dataRows = recordData.data;
      const rowIndex = dataRows.findIndex((row) => row.id === rowId);
      if (rowIndex !== -1) {
        dataRows.splice(rowIndex, 1);
        const updatedAt = new Date();
        await db.collection(collectionName).doc(doc.id).update({
          data: dataRows,
          updatedAt,
        });
        updatedDocument = { id: doc.id, ...recordData, data: dataRows, updatedAt };
        break;
      }
    }
    return updatedDocument;
  } catch (error) {
    console.error('Error deleting CSV row:', error);
    throw error;
  }
};

module.exports = {
  createCsvRecord,
  getCsvRecordsForUser,
  getCsvRecordById,
  updateCsvRecord,
  bulkDeleteCsvRows, 
  updateCsvRow, 
  deleteCsvRow,
};
