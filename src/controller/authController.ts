import bcrypt from "bcrypt";
import { UserEmail } from "../model/userModel";
var validator = require("validator");
import lodash from "lodash";
import { sentEmail } from "../utils/emailSender";
import { ApiResponse } from "../utils/apiResponse";
import { createOtp, sendOtp, verifyEmailOtp } from "../utils/otpSender";

const customerLogin = async (req: any, res: any, next: any) => {
  try {
    let userEmail = req.body.email;
    let isValidEmail;

    if (userEmail) {
      isValidEmail = validator.isEmail(userEmail);
    }

    if (userEmail && isValidEmail) {
      const user = await UserEmail.findOne({ email: userEmail });

      if (user?.email == userEmail && user?._id) {
        // sentEmail(userEmail);

        const otp = await createOtp(user._id.toString());
        await sendOtp(userEmail, otp);

        res
          .status(200)
          .json(ApiResponse.success(user, "User found successfully!", 200));
      } else {
        res.status(500).json(ApiResponse.failure("User not found!", 500));
      }
    } else {
      res
        .status(400)
        .json(ApiResponse.success(null, "Please provide valid Email!", 400));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
  }

  // for passwords

  // bcrypt
  //   .hash(request.body.password, 10)
  //   .then((hashedPassword) => {
  //     const user = new UserLogin({
  //       email: request.body.email,
  //       password: hashedPassword,
  //     });

  //     user
  //       .save()
  //       .then((result) => {
  //         response.status(200).send({
  //           message: "User Created Successfully",
  //           result,
  //         });
  //       })
  //       .catch((error) => {
  //         response.status(500).send({
  //           message: "Error creating user",
  //           error,
  //         });
  //       });
  //   })
  //   .catch((e) => {
  //     response.status(500).send({
  //       message: "Password was not hashed successfully",
  //       e,
  //     });
  //   });
};

const customerRegister = (req: any, res: any, next: any) => {
  // console.log("req.body", _.get(req.body));
  try {
    let userEmail = req.body.email;
    let isValidEmail;

    if (userEmail) {
      isValidEmail = validator.isEmail(userEmail);
    }

    if (userEmail && isValidEmail) {
      const user = new UserEmail({
        email: userEmail,
      });

      user
        .save()
        .then((result) => {
          res.status(200).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          console.log("error", error);
          if (
            error?.errorResponse?.code == 11000 &&
            error?.errorResponse?.keyPattern?.email
          ) {
            res.status(500).send({
              message: "Email Already Exists!",
              error,
            });

            return;
          }

          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    } else {
      res
        .status(400)
        .json(ApiResponse.success(null, "Please provide valid Email!", 400));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
  }
};

const verifyOtp = async (req: any, res: any, next: any) => {
  try {
    let { otp, userId } = req.body;

    if (otp && userId) {
      try {
        const { userId, otp } = req.body;
        const isValidOtp = await verifyEmailOtp(userId, otp);

        if (!isValidOtp) {
          return res
            .status(500)
            .json(ApiResponse.failure("Invalid or Expired OTP!", 500));
        }

        console.log("otp success", isValidOtp);

        // Respond with tokens
      } catch {
        res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
      }
    } else if (userId) {
      res.status(400).json(ApiResponse.success(null, "User not found!", 400));
    } else {
      res
        .status(400)
        .json(ApiResponse.success(null, "Please provide otp!", 400));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
  }
};

export { customerRegister, customerLogin, verifyOtp };
