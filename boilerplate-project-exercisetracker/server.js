const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


// Basic Configuration
mongoose.connect('mongodb+srv://new_user1:new_user1@cluster0.c5ndq.mongodb.net/YUHACK?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const SesS = mongoose.Schema({
  description:{type: String, required: true},
  duration: {type: Number, required: true},
  date: String
});
const UseS = mongoose.Schema({
  username:{type: String, required: true},
  log: [SesS]
});
let Use = new  mongoose.model('Use', UseS);
let Ses = new mongoose.model('Ses', SesS);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/')
});
app.post("/api/users", function (req,res){
  var newU = new Use({username: req.body.username});
  newU.save();
  return res.json({'username': newU.username, '_id': newU.id}) 
})
app.get("/api/users", function (req, res){
  Use.find({}, function(err, data){ 
    res.json(data);
  })
})
app.post("/api/users/:_id/exercises", function(req, res){
  var newE = new Ses({description: req.body.description, 
  duration: req.body.duration,
  date: req.body.date 
  })
  if(!newE.date){newE.date = new Date().toISOString().substring(0,10);}
  newE.save();
  let y = Use.findByIdAndUpdate(req.params._id,
      {$push: {log: newE}},
      {new: true},function(err, data){
        let x = {}
        x["username"] = data.username
        x["description"] = req.body.description
        x["duration"] = newE.duration
        x["_id"] = data._id
        x["date"] = new Date(newE.date).toDateString(); 
        res.json(x);
      })
})
app.get("/api/users/:_id/logs", function(req,res){
  
  let y = Use.findById(req.params._id, function(err, data){
      let x = {}
      x["_id"] = data._id
      x["username"] = data.username
      end = req.query.to ? new Date(req.query.to) : new Date();
      start = req.query.from ? new Date(req.query.from) : new Date(0);
      data.log = data.log.filter((item) =>{
        let x = new Date(item.date).getTime();
        return x >= start && x <= end;
      })
      x["log"] = data.log.slice(0, req.query.limit);
      x["count"] = data.log.length;
      
      
      res.json(x);
      
  })
})
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
