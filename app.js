const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./database/config');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const qrRoutes = require('./routes/qrRoutes');
app.use('/api/lecture', qrRoutes);

const LecturerAuthRoute = require('./routes/Lecturer_Auth_Router');
app.use('/api/lecturerauth', LecturerAuthRoute);

const moduleRoutes = require('./routes/ModuleRoutes');
app.use('/api/modules', moduleRoutes);

const studentRoutes = require('./routes/AttendanceRoute');
app.use('/api/student', studentRoutes);

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
