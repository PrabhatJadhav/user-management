import { UserEmail } from "../model/userModel";
import { UserWatchlist } from "../model/watchlistModel";
var validator = require("validator");
import { ApiResponse } from "../utils/apiResponse";

const addToWatchlist = async (req: any, res: any, next: any) => {
  const id = req?.params?.id;

  //   Find if such product exist
  //   const product = await UserEmail.findOne({ email: userEmail });

  if (id?.length > 10) {
    const addToUserWatchlist = new UserWatchlist({
      id: id,
    });

    try {
      addToUserWatchlist
        .save()
        .then((result) => {
          res.status(200).send({
            message: "Added to watchlist!",
            result,
          });
        })
        .catch((error) => {
          console.log("error", error);
          //   if (
          //     error?.errorResponse?.code == 11000 &&
          //     error?.errorResponse?.keyPattern?.email
          //   ) {
          //     res.status(500).send({
          //       message: "Email Already Exists!",
          //       error,
          //     });

          //     return;
          //   }

          res.status(500).send({
            message: "Error adding to watchlist",
            error,
          });
        });
    } catch (e) {
      console.log("e", e);
      res
        .status(400)
        .json(ApiResponse.success(null, "Something Went Wrong!", 400));
    }
  } else {
    res
      .status(400)
      .json(ApiResponse.success(null, "Please provide a valid id!", 400));
  }
};

const removeFromWatchlist = (req: any, res: any, next: any) => {
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

export { addToWatchlist, removeFromWatchlist };
