//import { IncomingMessage, ServerResponse } from "http"
//import { resolve } from "path/posix"

let companies = require('/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server/data/database.json')
const { v4: uuidv4 } = require('uuid')
const {  writeDataToFile } = require("../utils")
//get the database

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

function getAll() {
return new Promise((resolve, reject)=> {
    resolve(companies)
})
}
//generate/create new ids for each product
//find product by id
function findById(id: number) {
    return new Promise((resolve, reject) => {
      const product = companies.find((c: { id: number }) => c.id === id);
      resolve(product);
    });
  }

function create(allData: Company) {
    return new Promise((resolve, reject) => {
        const newData = {id: uuidv4(), ...allData}
        companies.push(newData)
        writeDataToFile('/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server/data/database.json', companies);
    resolve(newData)
    })
}

//put
function updateProduct(id:number, product:Company) {
return new Promise((resolve, reject) =>{
const index = companies.findIndex((p: { id:number}) => p.id === id);
companies[index] = {id, ...product}
if(process.env.NODE_ENV != "test") {
    writeDataToFile('/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server/data/database.json', companies);
}
resolve(companies[index])
})
}

//DELETE
function removeProduct(id: string) {
    return new Promise<void>((resolve,reject) => {
        companies = companies.filter((f: {id:number | string}) => f.id !== id)
        if(process.env.NODE_ENV !== "test") {
            writeDataToFile("/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server/data/database.json", companies)
        }
        resolve()
    })
}


module.exports = {
    getAll,
    create,
    findById,
    updateProduct,
    removeProduct
}