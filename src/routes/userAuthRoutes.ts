import {
  customerRegister,
  customerLogin,
  verifyOtp,
  getRefreshToken,
} from "../controller/authController";
const express = require("express");
const userAuthRouter = express.Router();

// User Login endpoints

/**
 * @openapi
 * '/api/v1/register':
 *  post:
 *     tags:
 *     - User Auth Controller
 *     summary: Register A User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

userAuthRouter.post("/register", customerRegister);

userAuthRouter.post("/login", customerLogin);

userAuthRouter.post("/verify-email-otp", verifyOtp);

userAuthRouter.post("/generate-refresh-token", getRefreshToken);

export { userAuthRouter };
