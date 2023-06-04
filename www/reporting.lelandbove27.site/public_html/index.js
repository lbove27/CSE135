const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require("./routes/userRoutes");
const mongoose = require("mongoose");
const mysql = require('mysql2')

const app = express();

const MONGOURI = "";

app.use(bodyParser.json());
app.use(cors())

app.use("/user", user);



mongoose.connect(MONGOURI)
.then(() => {
	console.log("Connected to DB");
	app.listen(3000, () => {
		console.log(`Node is running on port 3000`);
    });
  })
  .catch((error) => {
	console.log(error);
  });