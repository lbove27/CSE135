//MongoDB Stuff
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://lbove:tHpwlEOR0dxptTgt@cluster0.lbkxxfj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    } 
  }


//Express Endpoints 
const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Test (can delete)
app.get("/", (req, res) => {
  console.log('testing if this updated');
  //Test mongodb
  run().catch(console.dir);
  res.send("Hello world it workssssss");
});

//Get for if javascript is not available 
app.get("/nojs", (req, res) => {

});

//Get all
app.get("/static", async (req, res) => {
  let result;
  let finalResult = [];
  try {
    await client.connect();
    result = await client.db("CSE135").collection("StaticData").find({}, );
    for await (const doc of result) {
      finalResult.push(doc);
    }
  } finally {
    await client.close();
  } 

  res.status(200);
  res.send(finalResult);
});

//Get id
app.get("/static/:id", async (req, res) => {
  let result;
  console.log(req.params.id);
  try {
    await client.connect();
    result = await client.db("CSE135").collection("StaticData").findOne({ _id: new ObjectId(req.params.id) });

  } finally {
    await client.close();
  } 
  console.log(result);
  res.status(200);
  res.send(result);
});

//Post static data
app.post("/static", jsonParser, async function(req, res) {
  console.log('it worked');
  console.log(req.body);

  try {
    await client.connect();
    await client.db("CSE135").collection("StaticData").insertOne(req.body['data'][0]);
  } finally {
    await client.close();
  } 
  
  res.status(200);
  res.send();
});

app.get("/activity", (req, res) => {
  
});

app.post("/activity", (req, res) => {

});

//posting additional data like when the user entered, exited, and which page
app.post("/additionalInfo", (req, res) => {

});

app.listen(port, () => console.log('Listening on port ' + port));