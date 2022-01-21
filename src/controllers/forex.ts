import express,{Request,Response} from 'express';
const PipFunction=require('../middleware/pipFunction');
const SwapFunction=require('../middleware/swapFunction');
const router=express();
const axios=require("axios");

type requestBodyReturnProfit={
    Opening:number,//for the Opening you catch the latest Trade's Mid value and use it 
    Closure:number,//for the Closure you catch the Actual Mid value and use it
    IsABuy:boolean,//this says if the user is Buying or selling(True=Buy & False=Sell)
    Lots:number,//Number of lots Buyed
    SwapTax:number,//Tax
    TotalDaysPassed:number//The Amount of nights that a trade Stayed Open 
}


router.post('/returnprofit',async(req:Request,res:Response)=>{
    try {
        const body=req.body as requestBodyReturnProfit;
        let PipData=PipFunction(req.body.Opening,req.body.Closure,req.body.IsABuy,req.body.Lots)
        let TotalSwapTax=SwapFunction(PipData.PipPrice,req.body.IsABuy,req.body.Lots,req.body.SwapTax,req.body.TotalDaysPassed)    
        let FinalProfitValue = PipData.Profit-TotalSwapTax
        res.status(200).send({FinalProfit:FinalProfitValue,...PipData,SwapTax:TotalSwapTax})
    } 
    catch (err) {
        console.log(err)
        res.status(400).send({error:"Error on Return the Profit"});
    }
})

router.post('/getdailyhistory',async(req:Request,res:Response)=>{
    try{
        let AxiosRes=await axios({
            url:`https://marketdata.tradermade.com/api/v1/timeseries?currency=GBPUSD&api_key=${process.env.API_TOKEN}&start_date=${req.body.StartDate}&end_date=${req.body.EndDate}&format=records`,
            method:'get',
            timeout:10000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        res.status(200).send(AxiosRes.data)
    }
    catch(err){
        console.log(err)
        res.status(400).send({error:"Error on Get the Daily Historic"});
    }
})

router.post('/gethourhistory',async(req:Request,res:Response)=>{
    try{
        let AxiosRes=await axios({
            url:`https://marketdata.tradermade.com/api/v1/timeseries?currency=GBPUSD&api_key=${process.env.API_TOKEN}&start_date=${req.body.StartDate}&end_date=${req.body.EndDate}&format=records&interval=hourly`,
            method:'get',
            timeout:10000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        res.status(200).send(AxiosRes.data)
    }
    catch(err){
        console.log(err)
        res.status(400).send({error:"Error on Get the Daily Historic"});
    }
})

router.post('/getminutehistory',async(req:Request,res:Response)=>{
    try{
        let AxiosRes=await axios({
            url:`https://marketdata.tradermade.com/api/v1/timeseries?currency=GBPUSD&api_key=${process.env.API_TOKEN}&start_date=${req.body.StartDate}&end_date=${req.body.EndDate}&format=records&interval=minute&period=15`,
            method:'get',
            timeout:10000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        res.status(200).send(AxiosRes.data)
    }
    catch(err){
        console.log(err)
        res.status(400).send({error:"Error on Get the Daily Historic"});
    }
})



export default router;