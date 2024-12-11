const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging line
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
