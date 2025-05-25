const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Use a more explicit path construction
const credentialsPath =     path.join(__dirname, 'Config', 'ServicesAccountCredentials.json');
console.log('Looking for credentials at:', credentialsPath); // Debug log

try {
    const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
    
    // Initialize Firebase Admin SDK
    let firebaseApp;
    
    if (!firebaseApp) {
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: serviceAccount.project_id
        });
    }
    
    const db = admin.firestore();
    
    // Function to add a user (using Admin SDK)
    const addUser = async (data) => {
        try {
            console.log('Adding user to Firestore with data:', data);
            const usersRef = db.collection('Users');
            const userRef = await usersRef.add(data);
            console.log("User added successfully with ID:", userRef.id);
            return userRef;  
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    };
    
    module.exports = { db, addUser };
} catch (error) {
    console.error("Failed to read Firebase credentials:", error);
    console.error("Please make sure the file exists at:", credentialsPath);
    process.exit(1); // Exit with error
}





