import express,{Request,Response} from 'express';
import Trades from '../database/tradesdb';

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
    userId:number
}

router.post("/createunfinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        let query={
            Lots:req.body.Lots,
            ExchangeType:req.body.ExchangeType,
            StartDate:req.body.StartDate,
            SwapTax:req.body.SwapTax,
            Finished:false,
            NextOpening:req.body.NextOpening,
            userId:req.body.userId
        }
        const result =await Trades.create(query)
        if(result){
            res.status(200).send({message:"Sucessfully Created"});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Create Register (Catch)"})
    }
})

router.post("/updatefinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        let tradeInfo=await Trades.findAll({where:{userId:req.body.userId}});
        let OldQuery=tradeInfo[tradeInfo.length-1];
        
        let query={
            Lots:OldQuery.Lots,
            ExchangeType:OldQuery.ExchangeType,
            Profit:req.body.Profit,
            StartDate:OldQuery.StartDate,
            FinalDate:req.body.FinalDate,            
            PipQtd:req.body.PipQtd,
            PipPrice:req.body.PipPrice,
            SwapTax:OldQuery.SwapTax,
            Finished:true,
            NextOpening:0,
            userId:req.body.userId
        }
        
        if(OldQuery.Finished===false){
            const result=await Trades.update(query,{where:{id:OldQuery.id,userId:query.userId}})
            if(result){
                res.status(200).send({message:"Register Sucessfully created"})
            }
        }
        else{
            res.status(200).send({message:"The Trade was already finished!"})
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Create Register (Catch)"})
    }
})

router.post('/getall',async(req:Request,res:Response)=>{
    try {
        const query=await Trades.findAll({where:{userId:req.body.userId}});
        res.status(200).send(query);
    } catch (err) {
        console.log(err);
        res.status(400).send({error:"Error on Get all Registers"})
    }
})

export default router;