const routes = require("express").Router();

const professionalController = require("../controllers/professionalController");

routes.get("/", professionalController.myData);

module.exports = routes;