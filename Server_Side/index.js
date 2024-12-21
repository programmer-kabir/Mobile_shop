const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const wishlistCollection = client.db("MobileShop").collection("wishlist");

    // products
    app.get("/products", async (req, res) => {
      const { name, brand, category, sort,page=1,limit=9 } = req.query;
      console.log(req.query);
      const query = {};
      if (name) {
        query.name = { $regex: name, $options: "i" };  
      }
      if (brand) {
        query.brand = { $regex: brand, $options: "i" };  
      }
      if (category) {
        query.category = { $regex: category, $options: "i" };  
      }
      
      const sortOptions = sort === "asc" ? 1 : -1;
      const pageNumber = Number(page)
      const limitNumber = Number(limit)
      const products = await productsCollection
        .find(query)
        .skip((pageNumber-1)*limitNumber)
        .limit(limitNumber)
        .sort({ price: sortOptions })
        .toArray();
      
      const totalProducts = await productsCollection.countDocuments(query);
      

      
      const categories = [...new Set(products.map((product) => product.category))];
      const brands = [...new Set(products.map((product) => product.brand))];
      
      res.send({ products, brands, categories,totalProducts });
    });
    
    app.post('/products',async(req, res) =>{
      const data = req.body;
      const result =  await productsCollection.insertOne(data)
      res.send(result)
    })

    app.get('/product/:id', async(req, res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    } )

// Wishlist
app.post('/wishlist', async (req, res) => {
  const data = req.body; // Request body containing product data
  const email = data.email; // User's email
  const productId = data.productId; // Product ID
  const sellerEmail = data.sellerEmail; // Seller's email

  try {
    // Check if the product already exists for the given email
    const existingWishlistItem = await wishlistCollection.findOne({
      email: email,
      'products.productId': productId,
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        message: 'This product is already in your wishlist.',
      });
    }

    // Add product to the wishlist under the corresponding email
    const updatedWishlist = await wishlistCollection.updateOne(
      { email: email }, // Find wishlist by email
      { $push: { products: { productId, sellerEmail, ...data } } }, // Add product with seller email
      { upsert: true } // Create document if it doesn't exist
    );

    res.status(200).json({
      message: 'Product added to wishlist successfully.',
      result: updatedWishlist,
    });
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/wishlist', async(req, res) =>{
  const email = req.query.email;
      // console.log(email);
      if (!email) {
        res.send([]);
      }
      const query = { email: email };
      const data = await wishlistCollection.find(query).toArray();
      res.send(data);
})


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
