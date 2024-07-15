const bcrypt = require("bcrypt");
const { UserEmail } = require("../model/userModel");
var validator = require("validator");
const lodash = require("lodash");
const AppError = require("../utils/appError");
const ApiResponse = require("../utils/apiResponse");
const { sentEmail } = require("../utils/emailSender");

const customerLogin = async (req, res, next) => {
  try {
    let userEmail = req.body.email;
    let isValidEmail;

    if (userEmail) {
      isValidEmail = validator.isEmail(userEmail);
    }

    if (userEmail && isValidEmail) {
      // const user = new UserEmail({
      //   email: userEmail,
      // });

      const user = await UserEmail.findOne({ email: userEmail });

      if (user?.email == userEmail) {
        sentEmail(userEmail);

        res
          .status(200)
          .json(
            new ApiResponse({ message: "User found successfully!", data: user })
          );
      } else {
        res.status(500).json(new AppError("User not found!", 500));
      }
    } else {
      res
        .status(400)
        .json(new ApiResponse({ message: "Please provide valid Email!" }));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(new AppError("Something Went Wrong!", 500));
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

const customerRegister = (req, res, next) => {
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
      // return next(new AppError("Please provide valid Email!", 400));
      res
        .status(400)
        .json(new ApiResponse({ message: "Please provide valid Email!" }));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(new AppError("Something Went Wrong!", 500));
  }
};

module.exports = { customerRegister, customerLogin };
