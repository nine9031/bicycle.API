require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Yo!");
});

app.get("/bicycle", (req, res) => {
  connection.query("select * from bicycle", function (err, results, fields) {
    res.send(results);
  });
});

app.get("/type", (req, res) => {
  connection.query("select * from type", function (err, results, fields) {
    res.send(results);
  });
});

app.get("/bicycleType", (req, res) => {
  connection.query(
    "select bicycleID, bicycleName, bicyclePrice, type.typeName from bicycle, type WHERE bicycle.typeID = type.typeID",
    function (err, results, fields) {
      res.send(results);
    }
  );
});

app.post("/addtype", function (req, res) {
  connection.query(
    "INSERT INTO type VALUES (?, ?)",
    [req.body.typeID, req.body.typeName],

    function (err, results) {
      if (err) throw err;
      return res.send({
        err: false,
        data: results,
        message: "New menu has been created successfully.",
      });
    }
  );
});

app.listen(process.env.PORT || 5000);
