const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// Virtual field for populating the blogs written by the user
userSchema.virtual("blogs", {
  ref: "Blog", // The model to link to
  localField: "_id", // Field in the current schema
  foreignField: "user", // Field in the target schema
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
