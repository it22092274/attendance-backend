const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://vihanga:vihanganethusara0120@attendencedb.hq3rj5i.mongodb.net/?retryWrites=true&w=majority&appName=attendenceDB';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { connectDB };
