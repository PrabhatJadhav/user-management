import express from "express";
import { dbConnect } from "./db/dbConnect.ts";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes/routes.ts";

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
