var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/now', function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
}, function(req, res) {
  req.time = new Date().toString()
  res.json({
    time: req.time
  });
});
app.get("/:word/echo", function middleware(req, res, next) {
  res.json({
    echo : req.params.word
  });
  next();
})
app.get("/name", function middleware(req, res, next) {
  res.json({
    name : req.query.first + " " + req.query.last
  });
  next();
})
app.post("/name", function middleware(req, res, next) {
  res.json({
    name : req.body.first + " " + req.body.last
  });
  next();
})
path = __dirname + "/views/index.html" 
function x(req, res) {
    res.sendFile(path);
  }
app.get("/", x)
app.use("/public", express.static(__dirname + "/public"))
process.env.MESSAGE_STYLE="Uppercase"
app.get("/json", (req, res) => {
  if(process.env.MESSAGE_STYLE === "Uppercase")
  res.json({
    message: "Hello json".toUpperCase()
  });
  else
  res.json({
    message: "Hello json"
  });
});

  




































 module.exports = app;
