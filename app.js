const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router");
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api", router);
app.listen(5000, () => {
  console.log("App started on port 5000");
});
