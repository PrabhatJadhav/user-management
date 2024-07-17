const authController = require("../controller/authController");
const express = require("express");
const router = express.Router();
// Test endpoints

router.get("/test-api", (req: any, res: any) => {
  res
    .status(200)
    .send({ data: "Hello, this is test api welcome to port 8080" });
});

// User Login related endpoints

router.post("/register", authController.customerRegister);

router.post("/login", authController.customerLogin);

export { router };
