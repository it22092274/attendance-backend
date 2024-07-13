const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./database/config');

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'https://attendance-inky-eight.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example route to test if server is running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
const qrRoutes = require('./routes/qrRoutes');
app.use('/api/lecture', qrRoutes);

const LecturerAuthRoute = require('./routes/Lecturer_Auth_Router');
app.use('/api/lecturerauth', cors(corsOptions), LecturerAuthRoute);

const moduleRoutes = require('./routes/ModuleRoutes');
app.use('/api/modules', moduleRoutes);

const studentRoutes = require('./routes/AttendanceRoute');
app.use('/api/student', studentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
