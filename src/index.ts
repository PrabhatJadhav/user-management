import express from "express";
import { dbConnect } from "./db/dbConnect";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes/routes";
import { swaggerDocs } from "./swagger";
import swaggerUi from "swagger-ui-express";

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

app.use("/api/v1", router);

app.use("/api/v1/docs", swaggerUi?.serve, swaggerUi?.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
