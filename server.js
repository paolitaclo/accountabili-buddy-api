const express = require('express');
const app = express();
const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log("Server starting up on " + port)
})
