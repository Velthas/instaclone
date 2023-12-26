const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");

const urls = {
  HELLO: "/api/hi",
  NEW: "/new",
};

// Setting up express
const app = express();

// Mongo Setup - Will need to install Mongoose.
const mongoDB = process.env.DATABASE_URL_DEV;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Middleware
app.use(express.urlencoded({ extended: true })); // Populating body in post requests
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable cors

// Routing
app.get(urls.HELLO, async (req, res) => {
  console.log('Well, I am here')
  res.json({ hi: "Hi from backend" }); // Sending payload back to frontend
});


const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log(`Server running at localhost:${process.env.PORT}`);
