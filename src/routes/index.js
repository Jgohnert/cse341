const express = require("express");
const routes = express.Router();
const homeRoute = require("../controllers/homeController");
const contacts = require("./contactsRoute");

routes.use(express.json());

routes.get("/", homeRoute.homepageRoute);

routes.use("/contacts", contacts);

module.exports = routes;