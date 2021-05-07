var express = require('express');
var cors = require('cors');
let multer =require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});
app.post("/api/fileanalyse", multer().single("upfile"), 
function(req, res){
  let x = {}
  x['name'] = req.file.originalname;
  x['type'] = req.file.mimetype;
  x['size'] = req.file.size;
  res.json(x);
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
