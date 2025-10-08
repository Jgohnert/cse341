const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "Description"
    },
    host: "localhost:3000"
};

const outputFile = "./swagger.json";
const routes = ["./src/routes/index.js"];

swaggerAutogen(outputFile, routes, doc);