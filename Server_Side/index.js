const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// MiddleWare
app.use(cors());
app.use(express.json());

// Mongo Db Connections

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
// MongoDb Apis
const usersCollection = client.db("MobileShop").collection("users");

app.post("/users", async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await usersCollection.findOne(query);
    if (existingUser) {
      return res.send({ message: "user already exist" });
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

  app.get("/users", async (req, res) => {
    const user = await usersCollection.find().toArray();
    res.send(user);
  });


    await client.db("admin").command({ ping: 1 });
    console.log("Database Connection successfully!!!");
  } catch (error) {
    console.log(error.message);
  }
}
run().catch(console.dir);

// Api
app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port);
