'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 8888;
const HOST = "127.0.0.1";


const app = express();


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



app.post("/code/", (req, res) => {

  console.log(req.body);
  res.sendStatus(200);

});


app.listen(PORT, HOST);
console.log(`Service is up and running on ${HOST}:${PORT}`);
