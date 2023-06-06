const express = require("express")
//const router = express.Router();
const User = require("./model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const bodyParser = require("body-parser");
const cors = require('cors');
//const user = require("./userRoutes");
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

//app.use("/user", user);

app.post("/register", async(req,res) =>{
    const {username, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                msg:"User Already exists"
            });
        }
        user = new User({
            username,
            email,
            password,
        });
        const s = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, s);

        await user.save();

        res.status(200).json({
            msg : "User created successfully"
        });
    } catch(err){
        res.status(500).json({
            msg : err.msg
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
		let user = await User.findOne({
			email,
		});
        //add in a username here instead of just email and do an && for invalid
		if (!user){
			return res.status(400).json({
				msg: "Invalid username",
			});
		}
		const flag = await bcrypt.compare(password, user.password);
		if (!flag){
			return res.status(400).json({
				msg: "Invalid password",
			});
	  	}

		const payload = {
			user: {
				id: user.id,
			},
		};

      	jwt.sign(payload, 'secret-key' ,{ expiresIn: 10000,}, async (err, token) => {
			if (err) throw err;
            //update database
            try {
                await client.connect();
                let getWithEmail = { "email": email };
                let updateToken = { $set: { "authToken": token }};
                await client.db("test").collection("users").updateOne(getWithEmail, updateToken);
              } finally {
                await client.close();
              } 
			res.status(200).json({
				token,
			});
		});
    } catch (err) {
		res.status(500).json({
			msg : err.message
		});
    }
});

app.get("/secure-api", auth, async (req, res) => {
    try {
      res.json({
          msg : 'Secure Api Tested'
      });
    } catch (e) {
      res.send({ msg: "Error in Fetching user" });
    }
});

//dashboard route
app.get("/dashboard/:authToken", async (req, res) => {
    let token = req.params.authToken;

    try {
        await client.connect();
        let found = await client.db("test").collection("users").find({ "authToken": token}).count();
        console.log(found);
        console.log(!found);
        if(!found) {
            res.status(404);
            res.header("Content-Type: text/html");
            res.send("<html><body><h1>Go back to the login please</h1></body></html>");
        }
        else {
            res.header("Content-Type: text/html");
            res.status(200);
            res.send("<html><body><h1>Dashboard</h1></body></html>");
          }
      } finally {
        await client.close();
      } 
      
}); 

//report route
app.get("/report/:authToken", async (req, res) => {
    let token = req.params.authToken;

    try {
        await client.connect();
        let found = await client.db("test").collection("users").find({ "authToken": token}).count();
        console.log(found);
        console.log(!found);
        if(!found) {
            res.status(404);
            res.header("Content-Type: text/html");
            res.send("<html><body><h1>Go back to the login please</h1></body></html>");
        }
        else {
            res.header("Content-Type: text/html");
            res.status(200);
            res.send("<html><body><h1>Report</h1></body></html>");
          }
      } finally {
        await client.close();
      } 
});

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
//module.exports = router;