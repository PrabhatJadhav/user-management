import mongoose, { Schema, Model } from "mongoose";

interface IUserEmail {
  email: string;
}

const UserEmailSchema: Schema<IUserEmail> = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid Email!"],
    unique: true,
  },
});

const UserEmail: Model<IUserEmail> = mongoose.model<IUserEmail>(
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
