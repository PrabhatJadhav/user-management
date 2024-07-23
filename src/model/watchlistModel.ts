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

const UserWatchlist: Model<UserWatchlistObject> =
  mongoose.model<UserWatchlistObject>(
    "UserWatchlist",
    UserWatchlistObjectSchema,
    "userwatchlistdata"
  );

export { UserWatchlist };
