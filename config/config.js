const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://153arjununni1234:PodaThayoli@cluster0.ricsbah.mongodb.net/portfolio";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;