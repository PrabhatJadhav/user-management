import {
  addToWatchlist,
  getUsersWatchlist,
  removeFromWatchlist,
} from "../controller/watchlistController";
const express = require("express");
const watchlistRouter = express.Router();
import { authenticateToken } from "../middleware/verifyTokens";

// Watchlist endpoints

watchlistRouter.post("/add", authenticateToken, addToWatchlist);

watchlistRouter.get("/user-watchlist", authenticateToken, getUsersWatchlist);

watchlistRouter.delete("/:productId", authenticateToken, removeFromWatchlist);

export { watchlistRouter };
