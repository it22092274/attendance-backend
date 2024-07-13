const qr = require('qr-image');
const { ModuleModel } = require('../models/ModuleModel');
const Attendance = require('../models/AttendenceModel');

const getqr = async (req, res) => {
    const { id } = req.params;

    try {
        const module = await ModuleModel.findById(id);

        if (!module) {
            return res.status(404).send('Module not found');
        }

        const link = `http://192.168.43.60:5173/display_real_time_attendance_page`;
        const qrcode = qr.image(link, { type: 'png' });

        res.type('png');
        qrcode.pipe(res);
    } catch (error) {
        console.error('Error generating QR Code:', error);
        res.status(500).send('Internal Server Error');
    }
};

const fetchRealTimeData = async (req, res) => {
    const { module, year, semester, batch, date } = req.query;

    console.log('Query Params:', { module, year, semester, batch, date });

    try {

        const realtimedata = await Attendance.find({
            module,
            year,
            semester,
            batch,
            date,
        });



        res.status(200).json(realtimedata);
    } catch (error) {
        console.error('Error fetching real-time data:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getqr, fetchRealTimeData };
