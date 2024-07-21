import {
  customerRegister,
  customerLogin,
  verifyOtp,
  getRefreshToken,
} from "../controller/authController";
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

// User Login related endpoints

router.post("/register", customerRegister);

router.post("/login", customerLogin);

router.post("/verify-email-otp", verifyOtp);

router.post("/generate-refresh-token", getRefreshToken);

export { router };
