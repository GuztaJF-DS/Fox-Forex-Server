const fetch=require('node-fetch');
const {db}=require('../src/database/connection');
const express=require('express')
const bodyParser=require('body-parser')
const index=require('../src/controllers/index')
import 'dotenv/config';

const UserQuery={
    currentProfit:5,
    currentLots:0,
    userName:"TestUser",
    password:"TestPassword"   
}

const UserUpdatedQuery={
    currentProfit:50,
    currentLots:0,
    userName:"TestUser",
    password:"TestPassword" 
}

db();
const app=express()
app.use(bodyParser.json())
app.use(index)
const server=app.listen(process.env.PORT||3000,()=>{
    console.log(`server listening on ${(process.env.PORT!='')?process.env.PORT:'3000'}`)
})
    
afterAll(async()=>{
    await fetch('http://localhost:3030/user/delete',{
        method:'post',
        body:JSON.stringify(UserQuery),
        headers: {'Content-Type': 'application/json'}
    })
    await server.close();
})

describe("User_Tests",()=>{
    it("CreateUser",async()=>{
        const response=await fetch('http://localhost:3030/user/new',{
            method:'post',
            body:JSON.stringify(UserQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe("Sucessfully Created")
    })

    it("LoginUser",async()=>{
        const response=await fetch('http://localhost:3030/user/login',{
            method:'post',
            body:JSON.stringify(UserQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe('Login Sucessfully')
    })
    
    it("GetUser",async () => {
        const response=await fetch('http://localhost:3030/user/get',{
            method:'get'
        })
        expect(response.status).toBe(200)
    })
    
    it("UpdateUser",async () => {
        const response=await fetch('http://localhost:3030/user/update',{
            method:'post',
            body:JSON.stringify(UserUpdatedQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe('Updated Sucessfully')
    })

    it("GetUpdatedUser",async()=>{
        const response=await fetch('http://localhost:3030/user/login',{
            method:'post',
            body:JSON.stringify(UserUpdatedQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.currentProfit).toBe(50)
    })
})