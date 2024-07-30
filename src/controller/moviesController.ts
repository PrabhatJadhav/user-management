import { ListDataModel } from "../model/listDataModel";
import { Movies } from "../model/moviesModel";
import { ApiResponse } from "../utils/apiResponse";
import { getPaginationData } from "../utils/pagination";

const getMovies = async (req: any, res: any, next: any) => {
  const movieId = req?.params?.movieId;

  //   Return single movie

  if (movieId) {
    try {
      //   Find movie

      const product = await Movies.findById(movieId);

      if (product) {
        res.status(200).json(ApiResponse.success(product, "Success!", 200));
      } else {
        res.status(400).json(ApiResponse.failure("Movie does not exist!", 400));
      }
    } catch (e) {
      console.log("e", e);
      res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
    }

    return;
  }

  //   Return movies list

  const pageNo = parseInt(req?.query?.pageNo) || 1;
  const pageSize = parseInt(req?.query?.pageSize) || 25;
  const skip = (pageNo - 1) * pageSize;

  try {
    //   Find movies

    const movies = await Movies?.find()?.skip(skip)?.limit(pageSize);

    // ?.exec();

    const count = await Movies?.countDocuments();

    let returnObject: ListDataModel = {
      listData: movies?.length > 0 ? movies : [],
      paginationData: getPaginationData(count, pageSize),
    };

    if (movies?.length > 0) {
      res.status(200).json(ApiResponse.success(returnObject, "Success!", 200));
    } else if (movies?.length == 0) {
      res
        .status(200)
        .json(ApiResponse.success(returnObject, "No Movies Found!", 200));
    } else if (!pageNo || !pageSize) {
      res
        .status(400)
        .json(ApiResponse.failure("Invalid Page Number or Page Size!", 400));
    } else {
      res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json(ApiResponse.failure("Something Went Wrong!", 500));
  }
};

export { getMovies };
