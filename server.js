const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/mongodbConnect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app

  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  })

  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/", require("./src/routes"));

const port = process.env.PORT || 3000;
mongodb.connectDb().then(() => {
  // Statement to confirm server operation
  app.listen(port, () => {
    console.log("Web Server is listening at port" + (port) + ". Database is connected");
  });
});