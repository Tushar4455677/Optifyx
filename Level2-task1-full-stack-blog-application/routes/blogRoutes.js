const express = require('express');
const router = express.Router();

const {
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    getBlogByIdController,  // ✅ Correct name
    deleteBlogController
} = require('../controllers/blogController');



router.get('/all-blog', getAllBlogsController);
router.post('/create-blog', createBlogController);
router.put('/update-blog/:id', updateBlogController);
router.get('/get-blog/:id', getBlogByIdController); // ✅ Corrected usage
router.delete('/delete-blog/:id', deleteBlogController); // Also fixed route param typo

module.exports = router;
