const http = require("http");
const fs = require("fs");
const url = require("url");

const static = require("node-static");
const path = require("path");
const PUBLIC_DIR = path.join(__dirname, "../public");
const fileStatic = new static.Server(PUBLIC_DIR);

const { PORT = 8000 } = process.env;

function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIR, htmlFileName);
  return fs.readFileSync(htmlFilePath, "utf-8");
}

function onRequest(request, response) {
  switch (request.url) {
    case "/":
      response.writeHead(200);
      response.end(getHTML("index.html"));
      return;
    case "/cars":
      response.writeHead(200);
      response.end(getHTML("cariMobil.html"));
      return;

    default:
      
      const fileTypes = {
        css: "text/css",
        js: "application/javascript",
        ico: "image/x-icon",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        svg: "image/svg+xml",
        json: "application/json",
        map: "application/json",
        txt: "text/plain",
      };
      const pathname = url.parse(request.url, true).pathname;
      fs.readFile("./public" + pathname, (err, file) => {
        if (err) {
          response.status = 404;
          response.end("404 Not Found BRO");
          return;
        }

        for (const [key] of Object.entries(fileTypes)) {
          const end = `.${key}`;
          if (request.url.endsWith(end)) {
            response.setHeader("Content-Type", fileTypes[key]);
            response.end(file);
            return;
          }
        }
      });
      return;
  }
}

const server = http.createServer(onRequest);

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:%d`, PORT);
});