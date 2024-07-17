import mongoose from "mongoose";
require("dotenv").config();

async function dbConnect() {
  // use mongoose to connect our db on mongoDB using the DB_URL from env
  if (process.env.DB_URL) {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
      });
  }
}

export { dbConnect };
