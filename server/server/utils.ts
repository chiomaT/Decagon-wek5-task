
import http, { IncomingMessage, Server, ServerResponse } from "http";
const fs = require('fs');



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


function writeDataToFile(filename:string, content:Company) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err: any) => {
        if(err) {
            console.log(err)
        }
    })
}

function getPostData(req:IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk:any) => {
                body += chunk.toString() 
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}