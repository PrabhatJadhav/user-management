const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRegisterSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid Email!"],
    unique: [true, "Email Exist"],
  },
});

const UserLoginSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid Email!"],
    unique: [true, "Email Exist"],
  },
});

const UserRegister = mongoose.model("UserRegister", UserRegisterSchema);
const UserLogin = mongoose.model("UserLogin", UserLoginSchema);

module.exports = { UserRegister, UserLogin };
