const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router");

app.use(bodyParser.json());

app.use("/api", router);
app.listen(5000, () => {
  console.log("App started on port 5000");
});
