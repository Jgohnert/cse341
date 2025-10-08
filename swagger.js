const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "Description"
    },
    host: "https://cse341-jgohn.onrender.com"
};

const outputFile = "./swagger.json";
const routes = ["./src/routes/index.js"];

swaggerAutogen(outputFile, routes, doc);