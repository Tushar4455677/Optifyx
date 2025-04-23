const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

// Virtual field for reverse-population
blogSchema.virtual("userBlogs", {
  ref: "Blog", // The model to link to
  localField: "_id", // Field in the current schema
  foreignField: "user", // Field in the target schema
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
