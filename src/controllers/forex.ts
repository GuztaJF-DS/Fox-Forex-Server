import express from 'express';
import PipFunction from '../middleware/PipFunction';
import SwapFunction from '../middleware/SwapFunction'; 
const router=express();

type requestBodyReturnProfit={
    bid:number,
    ask:number,
    IsABuy:boolean,
    Lots:number
}

router.post('/ReturnProfit',async(req,res)=>{
    try {
        const body=req.body as requestBodyReturnProfit;
        let PipData=PipFunction({"bid":req.body.bid,"ask":req.body.ask},req.body.IsABuy,req.body.Lots)
        let SwapTax=SwapFunction(PipData.PipPrice,true,1,0.51,1)    
    } 
    catch (err) {
        console.log(err)
        res.status(400).send({message:'error'})
    }
})

export default router;