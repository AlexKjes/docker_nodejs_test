'use strict'
const express = require('express');

const PORT = 8888;
const HOST = "127.0.0.1";


const app = express();
app.get("/", (req, res) => {
  res.send("this end point works");
});

app.listen(PORT, HOST);
console.log(`Service is up and running on ${HOST}:${PORT}`);
