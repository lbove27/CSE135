const express = require("express")
//const router = express.Router();
const User = require("./model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const MONGOURI = "mongodb+srv://lbove:tHpwlEOR0dxptTgt@cluster0.lbkxxfj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGOURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

app.use(bodyParser.json());
app.use(cors());

//dashboard html

//report html


//connect
mongoose.connect(MONGOURI)
.then(() => {
	console.log("Connected to DB");
	app.listen(3003, () => {
		console.log(`Node is running on port 3003`);
    });
  })
  .catch((error) => {
	console.log(error);
  });