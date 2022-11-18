const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const Schema = mongoose.Schema;
const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "h=QB5HqJfPShNZ5hbXXZ",
  },

  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
  bulk: {
    size: 2800, // preferred number of docs to bulk index
    delay: 100, //milliseconds to wait for enough docs to meet size constraint
  },
});
const UserSchema = new Schema({
  name: String,
  email: String,
  city: String,
});

UserSchema.plugin(mongoosastic, {
  esClient: client,
});

const finalschema = mongoose.model("user", UserSchema);
// finalschema
//   .createMapping()
//   .then((mapping) => {
//     console.log("mapping created!");
//     console.log(mapping);
//   })
//   .catch((err) => {
//     console.log("error creating mapping (you can safely ignore this)");
//     console.log(err);
//   });

module.exports = finalschema;

// const mongoose = require("mongoose");
// // const client = require("./index");

// const client = new Client({
//   node: "https://localhost:9200",
//   auth: {
//     username: "elastic",
//     password: "h=QB5HqJfPShNZ5hbXXZ",
//   },

//   tls: {
//     ca: fs.readFileSync("./http_ca.crt"),
//     rejectUnauthorized: false,
//   },
// });
// var user = mongoose.Schema({
//   name: { type: String, es_indexed: true },
//   roll: Number,
//   data: [Object],
// });
// user.plugin(
//   concetor,
//   // { index: "users", type: "user" },
//   {
//     esClient: client,
//   }
// );

// // hosts: ["127.0.0.1:9200"],
// //   auth: {
// //     username: "elastic",
// //     password: "h=QB5HqJfPShNZ5hbXXZ",
// //   },

// //   tls: {
// //     ca: fs.readFileSync("./config/certs/http_ca.crt"),
// //     rejectUnauthorized: false,
// //   },
// //   bulk: {
// //     size: 2800, // preferred number of docs to bulk index
// //     delay: 100, //milliseconds to wait for enough docs to meet size constraint
// //   },
