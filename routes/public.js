const fs = require("fs");
const path = require("path");

function public(req, res) {
    const extension = path.extname(req.url); //получить расширени файла
    const filename = req.url.slice(1);
    let contentType = "";
    
    switch (extension) {
        case ".html":
            contentType = "text/html";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".svg":
            contentType = "image/svg+xml";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        default:
            contentType = "text/plain";
    }
    
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    
    const stream = fs.createReadStream(path.resolve("public", filename)); //public/css/app.css
    stream.pipe(res);
    stream.on("error", error => {
        if (error.code === "ENOENT") {
            res.writeHead(404, { "Content-type": "text/plain" });
            res.end("Not found");
        } else {
            res.writeHead(500, { "Content-type": "text/plain" });
            res.end(error.message);
        }
    });
};

module.exports = public;