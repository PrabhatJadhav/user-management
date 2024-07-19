import mongoose, { Schema, Model } from "mongoose";

interface UserOtp {
  userId: string;
  otp: string;
  expiresAt: Date;
}

const UserOtpSchema: Schema<UserOtp> = new Schema({
  userId: { type: String, required: true, ref: "User" },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const OtpSchema: Model<UserOtp> = mongoose.model<UserOtp>(
  "UserOtp",
  UserOtpSchema,
  "userotp"
);

export { OtpSchema };
