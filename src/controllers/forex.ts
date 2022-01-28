import express,{Request,Response} from 'express';
const router=express();
const axios=require("axios");

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