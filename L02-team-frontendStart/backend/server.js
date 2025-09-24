const express = require("express");
const cors = require("cors");
const app = express();

const professionalRoutes = require('./routes/professionalRoute');

app.use(cors());

app.use('/professional', professionalRoutes);

const port = 8080;

app.listen(process.env.PORT || port, () => {
  console.log("Web Server is listening at port" + (process.env.PORT || port));
});

