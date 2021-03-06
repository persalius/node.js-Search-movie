const http = require("http");
//server js

const render = require("./lib/render");
const { public, home, search, notFound } = require("./routes");

http.ServerResponse.prototype.render = render;

http.createServer((req, res) => {
    if (req.url.match(/\.(html|css|js|png|svg|jpg)$/)) {
        public(req, res);
    } else if (req.url === "/") {
        home(req, res);
    } else if (req.url.startsWith("/search")) {
        search(req, res);
    } else {
        notFound(req, res);
    }
}).listen(3000, () => console.log("Сервер работает"));