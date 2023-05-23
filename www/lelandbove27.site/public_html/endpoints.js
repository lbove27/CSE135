//MongoDB Stuff
const { MongoClient, ServerApiVersion } = require('mongodb');
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
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    } 
  }


//Express Endpoints 
const express = require('express');
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  console.log('testing if this updated');
  //Test mongodb
  run().catch(console.dir);
  console.log('why is it not working');
  res.send("Hello world it workssssss");
});

app.post("/static", (req, res) => {
    console.log('it worked');
});

//posting additional data like when the user entered, exited, and which page
app.post("/additionalInfo", (req, res) => {

});

app.listen(port, () => console.log('Listening on port ' + port));