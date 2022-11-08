const http = require('http');
const path = require("path");
const fs = require("fs");
const PUBLIC_DIRECTORY = path.join(__dirname, 'public');
const DATA_DIRECTORY = path.join(__dirname, 'data');

const getHTML = (fileName) => {
  const htmlFileIndex = path.join(PUBLIC_DIRECTORY, fileName);
  const htmlIndex = fs.readFileSync(htmlFileIndex, 'utf8');

  return htmlIndex
}

const onRequest = (req, res) => {
  switch (req.url) {
    case "/":
      const htmlIndex = getHTML('index.html');

      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(htmlIndex);

      return
    case "/about":
      const htmlAbout = getHTML('about.html');

      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(htmlAbout);

      return
    case "/json":
      const personJSON = JSON.stringify({
        name: "Aldi",
        age: 99
      }); // object js ke json

      // JSON.parse(person) // json ke object js

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(personJSON);

      return
    case "/people":
      const dataLoc = path.join(DATA_DIRECTORY, "people.json");
      const dataJSON = fs.readFileSync(dataLoc, 'utf8');

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(dataJSON);

      return
    case "/js":
      const dir = path.join(PUBLIC_DIRECTORY + "/scripts", "index.js");
      const content = fs.readFileSync(dir, 'utf8');

      res.setHeader('Content-Type', 'text/javascript');
      res.writeHead(200);
      res.end(content);

      return
    case "/image-favicon.png":
      const imgDir = path.join(PUBLIC_DIRECTORY + "/images", "favicon.png");
      const imgContent = fs.readFileSync(imgDir);

      res.setHeader('Content-Type', 'image/png');
      res.writeHead(200);
      res.end(imgContent, "binary");

      return
  }
}

const server = http.createServer(onRequest)

server.listen(2000, '127.0.0.1', () => {
  console.log("Server sudah berjalan, silakan buka http://localhost:2000");
})