const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_name: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  occupation: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
