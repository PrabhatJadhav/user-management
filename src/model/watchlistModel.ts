import mongoose, { Schema, Model } from "mongoose";

interface UserWatchlistObject {
  id: string;
}

const UserWatchlistObjectSchema: Schema<UserWatchlistObject> = new Schema({
  id: {
    type: String,
    required: [true, "Please provide a valid id!"],
    unique: true,
  },
});

const UserWatchlist: Model<UserWatchlistObject> =
  mongoose.model<UserWatchlistObject>(
    "UserWatchlist",
    UserWatchlistObjectSchema,
    "userwatchlistdata"
  );

export { UserWatchlist };
