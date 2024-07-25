import {
  customerRegister,
  customerLogin,
  verifyOtp,
  getRefreshToken,
} from "../controller/authController";
import { getMovies } from "../controller/moviesController";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../controller/watchlistController";
const express = require("express");
const router = express.Router();
import "../cron/otpCleanupCron";
import { authenticateToken } from "../middleware/verifyTokens";

// Test endpoints

router.get("/test-api", (req: any, res: any) => {
  res
    .status(200)
    .send({ data: "Hello, this is test api welcome to port 8080" });
});

router.get("/test-auth-access-api", authenticateToken, (req: any, res: any) => {
  console.log("auth req.body", req.body);
  console.log("auth req.user", req.user);
  res.status(200).send({ data: "Access Provided!" });
});

// User Login endpoints

router.post("/register", customerRegister);

router.post("/login", customerLogin);

router.post("/verify-email-otp", verifyOtp);

router.post("/generate-refresh-token", getRefreshToken);

// Watchlist endpoints

router.get("/watchlist/:userId/:productId", addToWatchlist);

router.delete("/watchlist/:userId/:productId", removeFromWatchlist);

// Movies Listing endpoints

router.get("/movie/:movieId", getMovies);

router.get("/movies", getMovies);

export { router };
