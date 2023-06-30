const fs = require('fs');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = 3000;

app.use(helmet());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", (req, res) => {
  return res.send("Your secret number is 22");
});

https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem')
}, app).listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
