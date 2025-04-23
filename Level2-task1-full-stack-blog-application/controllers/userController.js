const userModel = require('../models/userModel');

// Register Controller
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).send({
                message: 'All fields are required',
                success: false,
            });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                message: 'User already exists',
                success: false,
            });
        }

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password, // Make sure to hash the password before saving
        });

        await newUser.save();

        res.status(201).send({
            message: 'User registered successfully',
            success: true,
            user: newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error,
        });
    }
};

// Get All Users Controller
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            message: 'Users retrieved successfully',
            success: true,
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in fetching users',
            success: false,
            error,
        });
    }
};

// Login Controller (basic)
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({
                message: 'Email and password are required',
                success: false,
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).send({
                message: 'User not found',
                success: false,
            });
        }

        // Password match logic goes here (use bcrypt for hashing comparison)
        if (user.password !== password) { // Replace this with bcrypt compare
            return res.status(400).send({
                message: 'Invalid credentials',
                success: false,
            });
        }

        res.status(200).send({
            message: 'Login successful',
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in Login callback',
            success: false,
            error,
        });
    }
};
