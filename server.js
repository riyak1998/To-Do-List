const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const file=require('fs');
var port=process.env.PORT || 8080;
var todo=[];
app.listen(port,function(err){
  if(err) throw err;
  console.log("server is running");
})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use('/',express.static('client'));

app.post('/add',function(req,res){
  todo.push(req.body.data);
  WriteFile();
  res.sendStatus(200);
});

app.get('/display',function(req,res){
  ReadFile(res);
});

app.post('/delete',function(req,res){
  todo.splice(req.body.data,1);
  file.writeFile('./array',JSON.stringify(todo),function(err){
    if(err) throw err;
    ReadFile(res);
  });
});

app.post('/update',function(req,res){
  todo[req.body.data].done=true;
  file.writeFile('./array',JSON.stringify(todo),function(err){
    if(err) throw err;
    ReadFile(res);
  });
});

function WriteFile(){
  file.writeFile('./array',JSON.stringify(todo),function(err){
    if(err) throw err;
    console.log("array added");
  });
}

function ReadFile(res){
  file.readFile('./array',function(err,data){
    if(err) throw err;
    res.send(data);
  });
}
