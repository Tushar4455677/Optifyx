const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.white);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`.bgRed.white);
        // Do NOT crash the server, just log
    }
};

module.exports = connectDB;
