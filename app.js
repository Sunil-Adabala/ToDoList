// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
let items = ["buy food", "cook food", "eat food"];
let workItems = [];

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs"); //should be mentined only after app is created

app.get('/', function(req, res) {

  let today = new Date();
  // var currentDay = today.getDay();
  // var day = "";
  //
  // if (currentDay === 0)
  //   day = "Sunday";
  // else if (currentDay === 1)
  //   day = "Monday";
  // else if (currentDay === 2)
  //   day = "tuesday";
  // else if (currentDay === 3)
  //   day = "Wednesday";
  // else if (currentDay === 4)
  //   day = "thursday";
  // else if (currentDay === 5)
  //   day = "Friday";
  // else
  //   day = "Saturday";

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  if (req.body.list === "Work List") {
    let workItem = req.body.task;
    console.log(req.body);
    workItems.push(workItem);
    res.redirect("/work");
  } else {
    let item = req.body.task;
    items.push(item);
    console.log(req.body);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about",function(req,res){
  res.render(__dirname+"/views/about.ejs");

});

app.post("/about",function(req,res){
  res.render(__dirname+"/views/about.ejs");

});

app.listen(3000, function() { //process.env.PORT - allows heroku to select port
  console.log("listinng to 3000");
});
