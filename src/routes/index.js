const routes = require("express").Router();
const week1controller = require("../controllers/homeController");

routes.get("/", week1controller.homepageRoute);

module.exports = routes;