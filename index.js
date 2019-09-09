'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

const PORT = 8888;
const HOST = "127.0.0.1";


const app = express();



// on app create
try {
  fs.mkdirSync('data/img');
  fs.mkdirSync('data/log');
  fs.mkdirSync('data/tmp');
} catch {}

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw({
  type: 'image/png',
  limit: '10mb'
}));

app.use(bodyParser.raw({
  type: 'application/zip, application/octet-stream',
}));


app.get("/", (req, res) => {
  res.send("this end point works");
});

// post image
app.post("/img/:name", (req, res) => {
  fs.writeFile(`./data/img/${req.params.name}.png`, req.body, err => {
    if (err){
      console.log(err);
      res.sendStatus(500);

    } else {
      res.sendStatus(200);
    }
  });
});

// post to log file
app.post("/log/:name/", (req, res) => {
  console.log(req.body);
  fs.writeFile(`./data/log/${req.params.name}.log`, req.body + '\n', {flag: 'a'}, err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(`wrote "${req.body}" to ${req.params.name}`);
      res.sendStatus(200);
    }
  });
});



app.post("/model/", (req, res) => {
  fs.writeFile(`data/tmp/model.pyt`, req.body, err => {
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
      exec('scp data/tmp/model.pyt alex@organiccode.net:~/ml_projects/kaggle_steel/models/latest.pyt')
    }

  })
  console.log(req.body);
  res.sendStatus(200);

});


app.listen(PORT, HOST);
console.log(`Service is up and running on ${HOST}:${PORT}`);
