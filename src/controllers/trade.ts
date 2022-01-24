import express,{Request,Response} from 'express';
import { Trades } from '../database/tradesdb';

const router=express();

type requestBodyTrades={
    Lots:number,
    ExgangeType:boolean,
    Profit:number,
    StartDate:Date,
    FinalDate:Date,
    PipQtd:number,
    PipPrice:number,
    SwapTax:number,
    Finished:boolean,
    NextOpening:number,
    ID:string
}

router.post("/createunfinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        let query={
            Lots:req.body.Lots,
            ExgangeType:req.body.ExgangeType,
            StartDate:req.body.StartDate,
            SwapTax:req.body.SwapTax,
            Finished:false,
            NextOpening:req.body.NextOpening
        }
        await Trades.create(query,function(err){
            if(err){
                console.log(err);
                res.status(400).send({error:"Error on Create Register"})
            }
            else{
                res.status(200).send({message:"Register Sucessfully created"})
            }
        })
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Create Register (Catch)"})
    }
})

router.post("/updatefinished",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;
        let tradeInfo=await Trades.find({});
        let OldQuery=tradeInfo[tradeInfo.length-1];
        
        let query={
            Lots:OldQuery.Lots,
            ExgangeType:OldQuery.ExgangeType,
            Profit:req.body.Profit,
            StartDate:req.body.StartDate,
            FinalDate:req.body.FinalDate,            
            PipQtd:req.body.PipQtd,
            PipPrice:req.body.PipPrice,
            SwapTax:OldQuery.SwapTax,
            Finished:true,
            NextOpening:0
        }

        Trades.updateOne({_id:OldQuery._id},query,{upsert:false},function(err){
            if(err){
                console.log(err);
                res.status(400).send({error:"Error on Create Register"})
            }
            else{
                res.status(200).send({message:"Register Sucessfully created"})
            }
        })
    }catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Create Register (Catch)"})
    }
})

router.get('/getall',async(req:Request,res:Response)=>{
    try {
        const query=await Trades.find({});
        res.status(200).send(query);

    } catch (err) {
        console.log(err);
        res.status(400).send({error:"Error on Get all Registers"})
    }
})

router.post('/getone',async(req:Request,res:Response)=>{
    try {
        const body=req.body as requestBodyTrades;

        const query=await Trades.findById(req.body.ID);
        res.status(200).send(query);

    } catch (err) {
        console.log(err);
        res.status(400).send({error:"Error on Get all Registers"})
    }
})

export default router;