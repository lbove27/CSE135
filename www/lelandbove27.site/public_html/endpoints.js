//session id stuff
const crypto = require("crypto");
const sessionId = crypto.randomBytes(16).toString("hex");
//const session = require("express-session");

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

  const otherClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const putClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


//Express Endpoints 
const express = require('express');
const cors = require('cors');
///const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(cors({ origin: ['https://lelandbove27.site', 'https://reporting.lelandbove27.site'] }))
//app.use(cookieParser());
//app.use(session());

//Set cookie on the user
app.get("/", (req, res) => {
  res.cookie('sessionId', sessionId, { maxAge: 30 * 60 * 1000});
  res.send();
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
    //await client.close();
  } 

  res.status(200);
  res.send(finalResult);
});

//Get id
app.get("/static/:id", async (req, res) => {
  let result;
  try {
    await client.connect();
    result = await client.db("CSE135").collection("StaticData").findOne({ _id: new ObjectId(req.params.id) });

  } finally {
    //await client.close();
  } 
  
  res.status(200);
  res.send(result);
});

//Post static data
app.post("/static", jsonParser, async function(req, res) {
  console.log('it worked');
  console.log(req.body);

  try {
    await client.connect();
    //let session = ((req.headers.cookie).split("sessionId=")[1]).split(';')[0];
    //req.body['data'][0]['sessionId'] = session;
    await client.db("CSE135").collection("StaticData").insertOne(req.body['data'][0]);
  } finally {
    //await client.close();
  } 
  
  res.status(200);
  res.send();
});

app.put("/static/:id/:language", async (req, res) => {
  
  try {
    await putClient.connect();
    let getWithId = { _id: new ObjectId(req.params.id)};
    let updateLanguage = { $set: { "Language": req.params.language }};
    await putClient.db("CSE135").collection("StaticData").updateOne(getWithId, updateLanguage);
  } finally {
    //await putClient.close();
  } 
  res.status(200);
  res.send();
});

app.delete("/static/:id", async (req, res) => {
  try {
    await client.connect();
    let getWithId = { _id: new ObjectId(req.params.id)};
    await client.db("CSE135").collection("StaticData").deleteOne(getWithId);
  } finally {
    //await client.close();
  } 
  res.status(200);
  res.send();
}); 

//get all activity data
app.get("/activity", async (req, res) => {
  let result;
  let finalResult = [];
  try {
    await otherClient.connect();
    result = await otherClient.db("CSE135").collection("ActivityData").find({}, );
    for await (const doc of result) {
      finalResult.push(doc);
    }
  } finally {
    //await otherClient.close();
  } 

  res.status(200);
  res.send(finalResult);
});

//get one set of activity data
app.get("/activity/:id", async (req, res) => {
  let result;
  try {
    await client.connect();
    result = await client.db("CSE135").collection("ActivityData").findOne({ _id: new ObjectId(req.params.id) });

  } finally {
    //await client.close();
  } 
  
  res.status(200);
  res.send(result);
});

//get one type of activity data
app.get("/activity/getType/:type", async (req, res) => {
  let result;
  let finalResult = [];
  try {
    await client.connect();
    result = await client.db("CSE135").collection("ActivityData").find({ "type": req.params.type });
    for await (const doc of result) {
      finalResult.push(doc);
    }
  } finally {
    //await client.close();
  } 
  
  res.status(200);
  res.send(finalResult);
});

//post new activity data
app.post("/activity", jsonParser, async (req, res) => {
    try {
      await otherClient.connect();
      /*
      let session = ((req.headers.cookie).split("sessionId=")[1]).split(';')[0];
      console.log(req.body);
      //add session id to everything, add each array (errors, mouseActivity... separately)
      (req.body.errors).forEach(obj => {
        obj['sessionId'] = session;
      });

      (req.body.mouseActivity).forEach(obj => {
        obj['sessionId'] = session;
      });

      (req.body.keyboardActivity).forEach(obj => {
        obj['sessionId'] = session;
      });

      (req.body.idleTime).forEach(obj => {
        obj['sessionId'] = session;
      });

      (req.body.additionalData).forEach(obj => {
        obj['sessionId'] = session;
      });
      */
      if(req.body.errors.length > 0) {
        await otherClient.db("CSE135").collection("ActivityData").insertMany(req.body['errors']);
      }
      if(req.body.mouseActivity.length > 0) {
        await otherClient.db("CSE135").collection("ActivityData").insertMany(req.body['mouseActivity']);
      }
      if(req.body.keyboardActivity.length > 0) {
        await otherClient.db("CSE135").collection("ActivityData").insertMany(req.body['keyboardActivity']);
      }
      if(req.body.idleTime.length > 0) {
        await otherClient.db("CSE135").collection("ActivityData").insertMany(req.body['idleTime']);
      }
      if(req.body.additionalData.length > 0) {
        await otherClient.db("CSE135").collection("ActivityData").insertMany(req.body['additionalData']);
      }
      
    } finally {
      //await otherClient.close();
    } 

    res.status(200);
    res.send();
});

app.put("/activity/:id/:type", async (req, res) => {
  try {
    await putClient.connect();
    let getWithId = { _id: new ObjectId(req.params.id)};
    let updateLanguage = { $set: { "type": req.params.type }};
    await putClient.db("CSE135").collection("ActivityData").updateOne(getWithId, updateLanguage);
  } finally {
    //await putClient.close();
  } 
  res.status(200);
  res.send();
});

app.delete("/activity/:id", async (req, res) => {
  try {
    await client.connect();
    let getWithId = { _id: new ObjectId(req.params.id)};
    await client.db("CSE135").collection("ActivityData").deleteOne(getWithId);
  } finally {
    //await client.close();
  } 
  res.status(200);
  res.send();
});


/*
app.get("/linkData/", async (req, res) => {
  try {
    await client.connect();
    let getWithId = { _id: new ObjectId(req.params.id)};
    await client.db("CSE135").collection("ActivityData").find();
  } finally {
    await client.close();
  } 
  res.status(200);
  res.send();
});
*/

app.listen(port, () => console.log('Listening on port ' + port));