import express from 'express';
const PipFunction=require('../middleware/PipFunction');
const SwapFunction=require('../middleware/SwapFunction');
const router=express();

type requestBodyReturnProfit={
    bid:number,
    ask:number,
    mid:number,
    IsABuy:boolean,
    Lots:number,
    SwapTax:number,
    TotalNights:number
}

router.post('/ReturnProfit',async(req,res)=>{
    try {
        const body=req.body as requestBodyReturnProfit;
        let PipData=PipFunction({"bid":req.body.bid,"ask":req.body.ask,"mid":req.body.mid},req.body.IsABuy,req.body.Lots)
        let TotalSwapTax=SwapFunction(PipData.PipPrice,req.body.IsABuy,req.body.Lots,req.body.SwapTax,req.body.TotalNights)    
        let FinalProfitValue = PipData.Profit-TotalSwapTax
        res.status(200).send({FinalProfit:FinalProfitValue,...PipData,SwapTax:TotalSwapTax})
    } 
    catch (err) {
        console.log(err)
        res.status(400).send({message:'error'})
    }
})

export default router;