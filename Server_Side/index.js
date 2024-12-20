const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

// MiddleWare
app.use(cors());
app.use(express.json());

// Verify JWT
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: "unauthorized token" });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized token" });
    }
    req.decoded = decoded;
    next();
  });
};

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
    const productsCollection = client.db("MobileShop").collection("products");

    // products
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    // JWT
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "5h",
      });
      res.send({ token });
    });
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

    // Get admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.status === "admin" };
      res.send(result);
    });
    // Get Seller
    app.get("/users/sellers/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ Sellers: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { Sellers: user?.status === "Sellers" };
      res.send(result);
    });
    // Get Buyer
    app.get("/users/buyers/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ Buyers: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { Buyers: user?.status === "Buyers" };
      res.send(result);
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
