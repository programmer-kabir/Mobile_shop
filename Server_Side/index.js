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
// Api
app.get("/", (req, res) => {
    res.send("server is running");
  });

app.listen(port);