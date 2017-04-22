'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 9001;

app.use((req, res) => {
  res.sendStatus(404);
})

app.listen(port, () => {
  console.log("Server starting up on " + port)
})
