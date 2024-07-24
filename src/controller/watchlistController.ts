import { Movies } from "../model/moviesModel";
import { RegisteredUser } from "../model/userModel";
import { UserWatchlist } from "../model/watchlistModel";
var validator = require("validator");
import { ApiResponse } from "../utils/apiResponse";

const addToWatchlist = async (req: any, res: any, next: any) => {
  const productId = req?.params?.productId;
  const userId = req?.params?.userId;

  try {
    //   Find if such product exist

    const product = await Movies.findById(productId);

    //   Find if such user exist

    const user = await RegisteredUser.findById(userId);

    if (product?._id && user?._id) {
      const addToUserWatchlist = new UserWatchlist({
        productId: productId,
        userId: userId,
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
            if (error?.errorResponse?.code == 11000) {
              res
                .status(400)
                .json(ApiResponse.failure("Already added to watchlist!", 400));

              return;
            }

            res
              .status(500)
              .json(ApiResponse.failure("Error adding to watchlist!", 500));
          });
      } catch (e) {
        console.log("e", e);
        res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
      }
    } else if (user?._id) {
      res.status(400).json(ApiResponse.failure("Invalid Id!", 400));
    } else if (product?._id) {
      res.status(400).json(ApiResponse.failure("Invalid User!", 400));
    } else {
      res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
  }
};

const removeFromWatchlist = async (req: any, res: any, next: any) => {
  const productId = req?.params?.productId;
  const userId = req?.params?.userId;

  try {
    //   Find if such product and user exist

    const result = await UserWatchlist.find({
      productId: productId,
      userId: userId,
    });

    // console.log("result", result);

    if (result[0]?.productId == productId && result[0]?.userId == userId) {
      try {
        const deleteResult = await UserWatchlist.deleteOne({
          productId: productId,
          userId: userId,
        });

        if (deleteResult?.deletedCount) {
          res
            .status(200)
            .json(ApiResponse.failure("Removed from watchlist!", 200));
        } else {
          res
            .status(500)
            .json(
              ApiResponse.failure("Error in removing from watchlist!", 500)
            );
        }
      } catch (e) {
        console.log("e", e);
        res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
      }
    } else {
      res.status(400).json(ApiResponse.failure("Entry not found!", 400));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
  }
};

export { addToWatchlist, removeFromWatchlist };
