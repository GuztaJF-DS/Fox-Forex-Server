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
            Lots:body.Lots,
            ExchangeType:body.ExchangeType,
            StartDate:body.StartDate,
            SwapTax:body.SwapTax,
            Finished:false,
            NextOpening:body.NextOpening,
            userId:body.userId
        }
        const result =await Trades.create(query)
        if(result){
            res.status(200).send({message:"Trade Successfully Started"});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Create Register"})
    }
})

router.post("/updatefinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        let tradeInfo=await Trades.findAll({where:{userId:body.userId}});
        let OldQuery=tradeInfo[tradeInfo.length-1];
        
        let query={
            Lots:OldQuery.Lots,
            ExchangeType:OldQuery.ExchangeType,
            Profit:body.Profit,
            StartDate:OldQuery.StartDate,
            FinalDate:body.FinalDate,            
            PipQtd:body.PipQtd,
            PipPrice:body.PipPrice,
            SwapTax:OldQuery.SwapTax,
            Finished:true,
            NextOpening:0,
            userId:body.userId
        }
        
        if(OldQuery.Finished===false){
            const result=await Trades.update(query,{where:{id:OldQuery.id,userId:query.userId}})
            if(result){
                res.status(200).send({message:"Trade Sucessfully Finished"})
            }
        }
        else{
            res.status(200).send({message:"The Trade was already Finished!"})
        }
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