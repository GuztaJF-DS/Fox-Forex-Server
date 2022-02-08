import express,{Request,Response} from 'express';
import Trades from '../database/tradesdb';
import {worker,queue} from '../jobs/TradesJobs'

const router=express();

type requestBodyTrades={
    Lots:number,
    ExchangeType:boolean,
    Profit:number,
    StartDate:Date,
    FinalDate:Date,
    PipQtd:number,
    PipPrice:number,
    SwapTax:number,
    Finished:boolean,
    NextOpening:number,
    ID:number,
    userId:number,
    delayTime:number
}

router.post("/createunfinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        let query={
            Lots:body.Lots,
            ExchangeType:body.ExchangeType,
            StartDate:body.StartDate,
            SwapTax:body.SwapTax,
            Finished:false,
            NextOpening:body.NextOpening,
            userId:body.userId,
            delayTime:body.delayTime
        }
        queue.add('Trade',{query,type:"create"},{ removeOnComplete: true, removeOnFail: 1000,delay:body.delayTime}).then(()=>{
            let a=0
            worker.on('completed',(job:any, returnvalue: any) => {
                a=a+1
                if(a==1){
                    res.json(returnvalue)
                }
            })
        })        
    }catch(err){
        res.status(400).send({error:"Error on Create Register"})
    }
})

router.post("/updatefinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        queue.add('Trades',{body,type:"update"},{ removeOnComplete: true, removeOnFail: 1000 ,delay:body.delayTime}).then(()=>{
            let a=0
            worker.on('completed',(job:any, returnvalue: any) => {
                a=a+1
                if(a==1){
                    res.json(returnvalue)
                }
            })
        })
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Create Register"})
    }
})

router.post('/getall',async(req:Request,res:Response)=>{
    try {
        const query=await Trades.findAll({where:{userId:req.body.userId}});
        res.status(200).send(query);
    } catch (err) {
        console.log(err);
        res.status(400).send({error:"Error on Get all Records"})
    }
})

router.post('/deleteTables',async(req:Request,res:Response)=>{
    try {
        const ToDelete=await Trades.findAll({where:{userId:req.body.userId}});
        if(ToDelete.length!==0){
            for(let x=0;x<ToDelete.length;x++){
                await ToDelete[x].destroy();
            }
            res.status(200).send({message:"Deleted Successfully"});
        }
        else{
            res.status(200).send({error:"Nothing to Delete"});
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({error:"Error on Get all Records"})
    }
})

export default router;