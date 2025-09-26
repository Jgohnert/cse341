const routes = require("express").Router();
const homeRoute = require("../controllers/homeController");
const contacts = require("./contactsRoute");

routes.get("/", homeRoute.homepageRoute);

routes.use("/contacts", contacts);

module.exports = routes;