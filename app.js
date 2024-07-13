const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
const {connectDB} = require('./database/config');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB()

app.get('/', () => {
    console.log('hello');
})

const qrRoutes = require('./routes/qrRoutes');
app.use('/api/lecture', qrRoutes);

const LecturerAuthRoute = require('./routes/Lecturer_Auth_Router');
app.use('/api/lecturerauth', LecturerAuthRoute);

const moduleRoutes = require('./routes/ModuleRoutes');
app.use('/api/modules', moduleRoutes);

const studentRoutes = require('./routes/AttendanceRoute');
app.use('/api/student', studentRoutes);

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
