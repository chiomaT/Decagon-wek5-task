const Companies = require('../models/productModels')
import  { IncomingMessage, ServerResponse } from "http";
const {getPostData} = require('../utils')
//const {create} = require('./controllers/productControllers')
// const {create} = require('/Users/decagon/Documents/wk5-task-chiomaN/week-5-node-010-chiomaT/server/server/models/productModels.ts')

async function getData(req:IncomingMessage, res: ServerResponse) {
    const datum = await Companies.getAll()
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(datum))
}

async function createPost(req:IncomingMessage, res:ServerResponse) {

    try {
        const body = await getPostData(req)
                                                       
        const{ organization,
            createdAt,
            updatedAt,
            products,
            marketValue,
            address, 
            ceo,
            country,
            noOfEmployees,
            employees} = JSON.parse(body)


            const data = {
                organization,
                createdAt,
                updatedAt,
                products,
                marketValue,
                address,
                ceo,
                country,
                noOfEmployees,
                employees,
            }

            const newData = await Companies.create(data)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newData))  
            
    } catch (error) {
        console.log(error)
    }

}

async function getById(req:IncomingMessage, res:ServerResponse,id:string) {
    try {
        const dataId = await Companies.findById(id)

        if(!dataId) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(dataId))
        }
    } catch (error) {
        console.log(error)
    }
    
}

//GET SINGLE PRODUCT
async function update(req:IncomingMessage, res:ServerResponse, id:string) {
    try {
        const dataUpdate = await Companies.findById(id)
        if(!dataUpdate) {
            res.writeHead(404, {"Content-Type":"application/json"});
            res.end(JSON.stringify({message: "product not found"}))
        }

        else {
            const body = await getPostData(req)
            const{ organization,
                createdAt,
                updatedAt,
                products,
                marketValue,
                address, 
                ceo,
                country,
                noOfEmployees,
                employees} = JSON.parse(body)
    
    
                const updateData = {
                    organization: organization || dataUpdate.organization,
                    createdAt: createdAt || dataUpdate.createdAt,
                    updatedAt: updatedAt || dataUpdate.updatedAt,
                    products: products || dataUpdate.products,
                    marketValue: marketValue || dataUpdate.marketValue,
                    address: address || dataUpdate.address,
                    ceo: ceo || dataUpdate.ceo,
                    country: country || dataUpdate.country,
                    noOfEmployees: noOfEmployees || dataUpdate.noOfEmployees,
                    employees: employees || dataUpdate.employees
                }
    
                const newProduct = await Companies.updateData(id, updateData)
                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(newProduct))  
        }
    }catch(error) {
        console.log(error)
    }
}

//DELETE
async function deleteData(req:IncomingMessage, res:ServerResponse, id:string) {
    try {

        const data = await Companies.findById(id)
        if(!data) {
            res.writeHead(404, {"Content-Type" : "application/json"})
            res.end({message: "product not found"})
        }else {
            await Companies.removeProduct(id)
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({messeage: `product ${id} removed`}))
        }
    }
        catch(error) {
            console.log(error)
        }
    }
    


module.exports = {
    getData,
    createPost,
    getById,
    update,
    deleteData
}