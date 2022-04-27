import { end } from "cheerio/lib/api/traversing";
import http, { IncomingMessage, Server, ServerResponse } from "http";
const cheerio = require('cheerio')
const fs = require('fs')
const https = require('https')
/*
implement your server code here
*/
const PORT = process.env.PORT || 4001
const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/web' && req.method === 'POST') {
    let url = "";
    //get the data in chunks
    req.on("data", (chunk) => {
      //append to the url
      url += chunk.toString()
    })
    req.on("end", () => {
      url = JSON.parse(url)
      
      https.get(url, (resp: IncomingMessage) => {
        let data: string[] = []
        resp.on('data', (chunk) => {
          data.push(chunk)
        })
        resp
          .on('end', () => {
            const $ = cheerio.load(data.toString())
            let title = $('title').text();
            let description = ''
            let images: string[] = [];
            $('meta').each((i: number, content: string) => {
              const metaContent = $(content).attr('content');
              const metaProperty = $(content).attr('name');
              if (metaProperty !== undefined && metaProperty.toLowerCase() === 'description') {
                description = metaContent
              }
            })
            $('img').each((i: number, content: string) => {
              const image = $(content).attr('src')
              if (image !== undefined && image !== '') {
                images.push(image)
              }
            })
            let finalData = {
              title: title,
              description: description,
              images: images,
            }
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(finalData))
            fs.writeFileSync(
              '/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server2/data/url.json',
              JSON.stringify(finalData, null, 3),
              'utf8',
              (err: string) => {
                console.log(err)
              }
            )
          })
          .on('error', (err) => {
            console.log('Error: ', err.message)
          })
      })
    })
  }
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = server
// const server: Server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse) => {
//     if (req.method === "GET") {
//       res.end(JSON.stringify({ name: "hello" }));
//     }
//   }
// );
