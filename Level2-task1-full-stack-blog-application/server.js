const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require("./config/db")

dotenv.config()


const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

// Connect to MongoDB
connectDB()  // <-- ✅ ADD THIS LINE

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white)
})

app.get('/', (req, res) => {
    res.send('Welcome to BlogApp Backend');
});
