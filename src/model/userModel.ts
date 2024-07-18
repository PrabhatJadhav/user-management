import mongoose, { Schema, Model } from "mongoose";

interface UserEmail {
  email: string;
}

const UserEmailSchema: Schema<UserEmail> = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid Email!"],
    unique: true,
  },
});

const UserEmail: Model<UserEmail> = mongoose.model<UserEmail>(
  "UserEmail",
  UserEmailSchema,
  "userregisters"
);

export { UserEmail };

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
