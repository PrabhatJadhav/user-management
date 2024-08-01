import { getMovies } from "../controller/moviesController";
const express = require("express");
const moviesRouter = express.Router();
import { authenticateToken } from "../middleware/verifyTokens";

// Movies Listing endpoints

moviesRouter.get("/:movieId", authenticateToken, getMovies);

moviesRouter.get("/", authenticateToken, getMovies);

export { moviesRouter };
