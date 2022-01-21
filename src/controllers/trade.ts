import express,{Request,Response} from 'express';
import { Trades } from '../database/tradesdb';

const router=express();

type requestBodyTrades={
    Lots:number,
    ExgangeType:boolean,
    Profit:number,
    Date:Date,
    PipQtd:number,
    PipPrice:number,
    SwapTax:number,
    Finished:boolean,
    ID:string
}

router.post("/create",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyTrades;

        let query={
            Lots:req.body.Lots,
            ExgangeType:req.body.ExgangeType,
            Profit:req.body.Profit,
            Date:req.body.Date,
            PipQtd:req.body.PipQtd,
            PipPrice:req.body.PipPrice,
            SwapTax:req.body.SwapTax,
            Finished:req.body.Finished
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

router.get('/getall',async(req:Request,res:Response)=>{
    try {
        const query=await Trades.find({});
        res.status(200).send([...query]);

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