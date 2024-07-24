import mongoose, { Schema, Model } from "mongoose";

interface UserRegistration {
  email: string;
}

const UserEmailSchema: Schema<UserRegistration> = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid Email!"],
    unique: true,
  },
});

const RegisteredUser: Model<UserRegistration> =
  mongoose.model<UserRegistration>(
    "RegisteredUser",
    UserEmailSchema,
    "userregisters"
  );

export { RegisteredUser };

// const UserRegisterSchema = new Schema({
//   email: {
//     type: String,
//     required: [true, "Please provide a valid Email!"],
//     unique: [true, "Email Exist"],
//   },
// });

// const UserLoginSchema = new Schema({
//   email: {
//     type: String,
//     required: [true, "Please provide a valid Email!"],
//     unique: [true, "Email Exist"],
//   },
// });

// const UserRegister = mongoose.model("UserRegister", UserRegisterSchema);
// const UserLogin = mongoose.model("UserLogin", UserLoginSchema);
