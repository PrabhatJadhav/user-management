const express = require("express");
// require database connection
const { dbConnect } = require("./db/dbConnect");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// execute database connection
dbConnect();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./routes/routes"));

app.listen(8080, () => {
  console.log("server started on 8080");
});
