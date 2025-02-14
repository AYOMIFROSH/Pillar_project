// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoute = require('./firebase/authRoutes');
const googleRoutes = require('./firebaseModel/googleRoutes');
const emailRoutes = require('./firebaseModel/emailRoutes');
const csvRoutes = require('./firebase/csvRoute'); 
const openaiRouter = require('./utils/openaiWorkflow');
const { authenticate } = require('./firebase/firebaseMiddleware');

const app = express();

// Initialize Firebase connection before starting the server
const initializeFirebase = async () => {
  try {
    console.log('Firebase connected successfully');
  } catch (error) {
    console.error('Error connecting to Firebase:', error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

app.use('/api', googleRoutes);
app.use('/api/auth', authRoute);
app.use('/api/open', authenticate, openaiRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

app.use('/api', authenticate, emailRoutes);
// Mount CSV routes under /api (all routes in csvRoutes are already protected)
app.use('/api/entries', csvRoutes);

// Initialize Firebase first, then start the server
initializeFirebase().then(() => {
  app.listen(3000, () => console.log('Server running on 3000'));
});


