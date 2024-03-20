var express = require("express");
var router = express.Router();
var productHelper = require("../helper/Helper");
const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://153arjununni1234:PodaThayoli@cluster0.ricsbah.mongodb.net/portfolio";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

/* GET home page. */
router.get("/", async function (req, res, next) {

  let projects = db.collection("projects").find().toArray();
  projects.then((projects) => {
    res.render("projects", { projects: projects });
  });
  
});
router.get("/expertise", function (req, res, next) {

  let expertise = db.collection("expertise").find().toArray();
  expertise.then((expertise) => {
    res.render("expertise", { expertise: expertise });
  });
  
});

router.get("/addproject", function (req, res, next) {
  res.render("AddProject", { title: "Express" });
});
router.get("/AddExpertise", function (req, res, next) {
  res.render("AddExpertise", { title: "Express" });
});

router.post("/AddProjectSubmit", async (req, res) => {
  console.log(req.body);
  console.log(req.files.pimage);

  db.collection("projects").insertOne(req.body, (err, data) => {
    let image= req.files.pimage;
    image.mv("./public/project_images/"+data.insertedId.toString()+".jpg",() => {
      if (err) {

        console.log(err);
      
      }
      else {
      
        res.redirect("/");
      }
      
    });

   });
});

router.post("/AddExpertiseSubmit", async (req, res) => {
  console.log(req.body);
  console.log(req.files.Eimage);

  db.collection("expertise").insertOne(req.body, (err, data) => {
    let image= req.files.Eimage;
    image.mv("./public/images/"+data.insertedId.toString()+".jpg",() => {
      if (err) {

        console.log(err);
      
      }
      else {
      
        res.redirect("/expertise");
      }
      
    });

   });
});

module.exports = router;
