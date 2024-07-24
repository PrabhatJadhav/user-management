import mongoose, { Schema, Model } from "mongoose";

interface UserWatchlistObject {
  productId: string;
  userId: string;
}

const UserWatchlistObjectSchema: Schema<UserWatchlistObject> = new Schema({
  productId: {
    type: String,
    required: [true, "Please provide a valid id!"],
    unique: false,
  },
  userId: {
    type: String,
    required: [true, "Please provide a valid id!"],
    unique: false,
  },
});

// Ensure the combination of productId and userId is unique
UserWatchlistObjectSchema.index({ productId: 1, userId: 1 }, { unique: true });

const UserWatchlist: Model<UserWatchlistObject> =
  mongoose.model<UserWatchlistObject>(
    "UserWatchlist",
    UserWatchlistObjectSchema,
    "userwatchlistdata"
  );

export { UserWatchlist };
