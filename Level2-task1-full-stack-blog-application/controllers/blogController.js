const blogModel = require('../models/blogModel');
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('author', 'username email'); // Populate author data

        if (!blogs || blogs.length === 0) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Blogs retrieved successfully',
            blogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting blogs',
            error,
        });
    }
};



exports.createBlogController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { userId } = req.user; // Assuming you're using JWT to track logged-in users

        // Validate input
        if (!title || !content) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required',
            });
        }

        const newBlog = new blogModel({
            title,
            content,
            author: userId, // Associate the blog with the logged-in user
            createdAt: new Date(),
        });

        await newBlog.save();

        res.status(201).send({
            success: true,
            message: 'Blog created successfully',
            blog: newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while creating blog',
            error,
        });
    }
};



exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Blog retrieved successfully',
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while fetching blog by ID',
            error,
        });
    }
};


exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogModel.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Blog deleted successfully',
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while deleting blog',
            error,
        });
    }
};

exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const { userId } = req.user; // Assuming you're using JWT for user authentication

        // Validate input
        if (!title && !content) {
            return res.status(400).send({
                success: false,
                message: 'No update fields provided',
            });
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        // Ensure the logged-in user is the author of the blog
        if (blog.author.toString() !== userId) {
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to update this blog',
            });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save();

        res.status(200).send({
            success: true,
            message: 'Blog updated successfully',
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while updating blog',
            error,
        });
    }
};





