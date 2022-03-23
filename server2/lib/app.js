"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');
/*
implement your server code here
*/
const PORT = process.env.PORT || 4001;
const server = http_1.default.createServer((req, res) => {
    if (req.url === '/api/web' && req.method === 'POST') {
        let url = "";
        req.on("data", (chunk) => {
            url += chunk.toString();
        });
        req.on("end", () => {
            url = JSON.parse(url);
            https.get(url, (resp) => {
                let data = [];
                resp.on('data', (chunk) => {
                    data.push(chunk);
                });
                resp
                    .on('end', () => {
                    const $ = cheerio.load(data.toString());
                    let title = $('title').text();
                    let description = '';
                    let images = [];
                    $('meta').each((i, content) => {
                        const metaContent = $(content).attr('content');
                        const metaProperty = $(content).attr('name');
                        if (metaProperty !== undefined && metaProperty.toLowerCase() === 'description') {
                            description = metaContent;
                        }
                    });
                    $('img').each((i, content) => {
                        const image = $(content).attr('src');
                        if (image !== undefined && image !== '') {
                            images.push(image);
                        }
                    });
                    let finalData = {
                        title: title,
                        description: description,
                        images: images,
                    };
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(finalData));
                    fs.writeFileSync('/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server2/data/url.json', JSON.stringify(finalData, null, 3), 'utf8', (err) => {
                        console.log(err);
                    });
                })
                    .on('error', (err) => {
                    console.log('Error: ', err.message);
                });
            });
        });
    }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = server;
// const server: Server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );
