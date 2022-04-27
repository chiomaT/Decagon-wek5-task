import http, { IncomingMessage, Server, ServerResponse } from "http";
/*
implement your server code here
*/
const { getData, createPost, getById, update,deleteData} = require("./controllers/productController");

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/api/data") {
      getData(req, res);
    } 
    else if (req.method === "POST" && req.url === "/api/data") {
      createPost(req, res);
    }
    //get a specific data by it's id
    else if(req.url?.match(/\/api\/data\/\w+/) && req.method === 'GET') {
      const id = req.url.split('/')[3]
      getById(req, res, id)
  }
  else if(req.url?.match(/\/api\/data\/\w+/) && req.method === 'PUT') {
    
    const id = req.url.split('/')[3]
    update(req, res, id)
}else if(req.url?.match(/\/api\/data\/\w+/) && req.method === 'DELETE') {
  const id = req.url.split('/')[3]
  deleteData(req, res, id)
} else {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Route Not Found' }))
}

  });

interface Company{
    organization: string,
    createdAt: string,
    updatedAt: string,
    products: string[],
    marketValue: string,
    address: string,
    ceo: string,
    country: string,
    noOfEmployees: number,
    employees: string[]
}

server.listen(3005, () => {
  console.log("server running on port 3005...");
});
