const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("./db/mongodbConnect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({
    extended: true
  }))
  .use("/", require("./src/routes"));

const port = process.env.PORT || 3000;
mongodb.connectDb().then(() => {
  // Statement to confirm server operation
  app.listen(port, () => {
    console.log("Web Server is listening at port" + (port) + ". Database is connected");
  });
});