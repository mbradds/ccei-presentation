const express = require("express");
const compression = require("compression");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress }));

// the __dirname is the current directory from where the script is running
app.use(express.static(path.resolve(__dirname, "dist")));

// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index_en.html"));
});

app.listen(port);
