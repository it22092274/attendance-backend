const qr = require('qr-image');
const { ModuleModel } = require('../models/ModuleModel');
const Attendance = require('../models/AttendenceModel');

const getqr = async (req, res) => {
    const { id } = req.params;

    try {
        const currentmodule = await ModuleModel.findById(id);
        console.log("=========================================================================")
        console.log(currentmodule);

        if (!currentmodule) {
            return res.status(404).send('Module not found');
        }

        const { module, year, semester, batch } = currentmodule; // Get the query params from req.query
        console.log(module,year,semester,batch)
        const link = `http://localhost:5173/student_form_page?module=${module}&year=${year}&semester=${semester}&batch=${batch}`;
        const qrcode = qr.image(link, { type: 'png' });

        res.type('png');
        qrcode.pipe(res);
        console.log("=========================================================================")
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
