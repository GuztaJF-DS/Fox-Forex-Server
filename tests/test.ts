const fetch=require('node-fetch');  
const io = require("socket.io-client");
import 'dotenv/config';

//------------------------------------------
//------------------------------------------
//Open the server Before executing the tests
//------------------------------------------
//------------------------------------------

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

const TradeQuery={
    Lots:1,
    ExchangeType:true,
    StartDate:"01-01-2022-07:10",
    SwapTax:0.5,
	NextOpening:1.36127
}

const UpdatedTradeQuery={
    Profit: 6.03999,
    FinalDate: "2022-01-27T10:30:10.307Z",
    PipQtd: 0.1509999999993461,
    PipPrice: 40
}

async function getUserId(){
    const response=await fetch('http://localhost:3030/user/login',{
        method:'post',
        body:JSON.stringify(UserQuery),
        headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json();
    return(data.id)
}

const socket=io('http://localhost:8080')
    
afterAll(async()=>{
    const userId=await getUserId();

    await fetch('http://localhost:3030/trade/deleteTables',{
        method:'post',
        body:JSON.stringify({userId}),
        headers: {'Content-Type': 'application/json'}
    })

    await fetch('http://localhost:3030/user/delete',{
        method:'post',
        body:JSON.stringify(UserQuery),
        headers: {'Content-Type': 'application/json'}
    })
    if (socket.connected) {
        socket.disconnect();
      }
    
})

describe("User_Tests",()=>{
    it("Create_User",async()=>{
        const response=await fetch('http://localhost:3030/user/new',{
            method:'post',
            body:JSON.stringify(UserQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe("Successfully Created")
    })

    it("Login_User",async()=>{
        const response=await fetch('http://localhost:3030/user/login',{
            method:'post',
            body:JSON.stringify(UserQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe('Login Successfully')
    })
    
    it("Get_User",async () => {
        const response=await fetch('http://localhost:3030/user/get',{
            method:'get'
        })
        expect(response.status).toBe(200)
    })
    
    it("Update_User",async () => {
        const response=await fetch('http://localhost:3030/user/update',{
            method:'post',
            body:JSON.stringify(UserUpdatedQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe('Updated Successfully')
    })

    it("Get_Updated_User",async()=>{
        const response=await fetch('http://localhost:3030/user/login',{
            method:'post',
            body:JSON.stringify(UserUpdatedQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.currentProfit).toBe(50)
    })
})

describe("Trade_Tests",()=>{

    it("Create_Unfinished",async()=>{
        const userId=await getUserId();
        let NewTradeQuery={...TradeQuery,userId}
        const response=await fetch('http://localhost:3030/trade/createunfinished',{
            method:'post',
            body:JSON.stringify(NewTradeQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe("Trade Successfully Started")
    })

    it("Update_Finished",async()=>{
        const userId=await getUserId();
        let NewUpdatedTradeQuery={...UserUpdatedQuery,userId}
        const response=await fetch('http://localhost:3030/trade/updatefinished',{
            method:'post',
            body:JSON.stringify(NewUpdatedTradeQuery),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(data.message).toBe("Trade Sucessfully Finished")
    })

    it("Get_Trades", async()=>{
        const userId=await getUserId();
        const response=await fetch('http://localhost:3030/trade/getall',{
            method:'post',
            body:JSON.stringify({userId}),
            headers: {'Content-Type': 'application/json'}
        })
        expect(response.status).toBe(200)
    })
})

describe("Forex_Tests",()=>{
    const Today=new Date();
    const Yesterday=new Date(Today.setDate(Today.getDate()-1));
    const query={
        StartDate:Yesterday.toISOString(),
        EndDate:Today.toISOString()
    }

    it("getsDataPerDay",async()=>{
        const response=await fetch('http://localhost:3030/forex/getdailyhistory',{
            method:'post',
            body:JSON.stringify(query),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(response.status).toBe(200)
        expect(data.error).toBe(undefined)
    })
    it("getsDataPerHour",async()=>{
        const response=await fetch('http://localhost:3030/forex/gethourhistory',{
            method:'post',
            body:JSON.stringify(query),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(response.status).toBe(200)
        expect(data.error).toBe(undefined)
    })
    it("getsDataPerMinute",async()=>{
        const response=await fetch('http://localhost:3030/forex/getminutehistory',{
            method:'post',
            body:JSON.stringify(query),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        expect(response.status).toBe(200)
        expect(data.error).toBe(undefined)
    })
})

describe("Websocket_Tests",()=>{
    it("Connect_Websocket",()=>{
        expect(socket.connected).toBe(true)
    })

    it("Recives_Socket_Data",(done)=>{
        socket.on("sendData",function(data:any){
            let parsedData=(JSON.parse(data))
            expect(parsedData.symbol).toBe("GBPUSD")
            done()
        })
    })
})