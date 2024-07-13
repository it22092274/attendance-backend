const Attendance = require('../models/AttendenceModel');

const markAttendance = async (req, res) => {
    const { stdID, year, semester, module, batch, venue, attendance, ssid } = req.body;

    if (ssid !== 'HONOR X6a') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log(stdID, year, semester, module, batch, venue);

    // Only check for attendance records for the same day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format the date to yyyy-mm-dd
    const formattedToday = today.toISOString().split('T')[0];
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];

    const existingAttendance = await Attendance.findOne({ 
        stdID, 
        year, 
        semester, 
        module, 
        batch, 
        date: { $gte: new Date(formattedToday), $lt: new Date(formattedTomorrow) }
    });

    if (existingAttendance) {
        return res.status(409).json({ error: 'Attendance already marked' });
    }

    try {
        const newAttendance = new Attendance({
            stdID,
            year,
            semester,
            module,
            batch,
            venue,
            attendance,
            date: formattedTomorrow // Ensure the attendance date is recorded correctly
        });

        const savedAttendance = await newAttendance.save();
        return res.status(201).json(savedAttendance);
    } catch (error) {
        console.error('Error saving attendance:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchAttendance = async (req, res) => {
    try {
        const { year, semester, module } = req.query;

        // Build the filter object based on the query parameters
        let filter = {};
        if (year) filter.year = year;
        if (semester) filter.semester = semester;
        if (module) filter.module = module;

        const attendance = await Attendance.find(filter);
        return res.status(200).json({ attendance });
    } catch (error) {
        console.error('Error fetching attendance:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { fetchAttendance };

module.exports = {
    markAttendance,
    fetchAttendance,
};
