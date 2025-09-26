const express = require("express");
const app = express();
const mongodb = require("./db/mongodbConnect");

const port = process.env.PORT || 3000;

app.use("/", require("./src/routes"));

mongodb.connectDb().then(() => {
  // Statement to confirm server operation
  app.listen(port, () => {
    console.log("Web Server is listening at port" + (port) + ". Database is connected");
  });
});