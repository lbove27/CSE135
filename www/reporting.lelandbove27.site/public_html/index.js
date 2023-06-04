const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require("./userRoutes");
const mongoose = require("mongoose");

const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const MONGOURI = "mongodb+srv://lbove:tHpwlEOR0dxptTgt@cluster0.lbkxxfj.mongodb.net/?retryWrites=true&w=majority";


app.use(bodyParser.json());
app.use(cors())

app.use("/user", user);


mongoose.connect(MONGOURI)
.then(() => {
	console.log("Connected to DB");
	app.listen(3002, () => {
		console.log(`Node is running on port 3002`);
    });
  })
  .catch((error) => {
	console.log(error);
  });
