const express = require("express");
const app = express();
const User = require("./model");
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", (err) => {
  err ? console.log(err) : console.log("dbconnected");
});

app.get("/", (req, res) => {
  res.send("server is stase");
});

app.post("/", async (req, res) => {
  const data = req.body;
  console.log(req.body);
  var new_user = await new User(data);
  new_user.save((e) => {
    if (e) return res.send(e);
  });
  new_user.on("es-indexed", function (err, res) {
    if (err) throw err;
  });
  return res.send(new_user);
});

app.listen("6000", (e) => console.log(e));
