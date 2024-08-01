import express from "express";
import { dbConnect } from "./db/dbConnect";
import bodyParser from "body-parser";
import cors from "cors";
import { swaggerDocs } from "./swagger";
import swaggerUi from "swagger-ui-express";
import { testRouter } from "./routes/testRoutes";
import { moviesRouter } from "./routes/moviesRoutes";
import "../src/cron/otpCleanupCron";
import { userAuthRouter } from "./routes/userAuthRoutes";
import { watchlistRouter } from "./routes/watchlistRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

// Execute database connection
dbConnect();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

/************** Swagger Doc Routes **************/

app.use("/api/v1/docs", swaggerUi?.serve, swaggerUi?.setup(swaggerDocs));

/************** Test, User Auth Routes **************/

app.use("/api/v1", [testRouter, userAuthRouter]);

/************** Movies Routes **************/

app.use("/api/v1/movies", moviesRouter);

/************** Watchlist Routes **************/

app.use("/api/v1/watchlist", watchlistRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
