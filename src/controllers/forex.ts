import express,{Request,Response} from 'express';
const PipFunction=require('../middleware/pipFunction');
const SwapFunction=require('../middleware/swapFunction');
const router=express();

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
        let PipData=PipFunction({"Opening":req.body.Opening,"Closure":req.body.Closure,},req.body.IsABuy,req.body.Lots)
        let TotalSwapTax=SwapFunction(PipData.PipPrice,req.body.IsABuy,req.body.Lots,req.body.SwapTax,req.body.TotalDaysPassed)    
        let FinalProfitValue = PipData.Profit-TotalSwapTax
        res.status(200).send({FinalProfit:FinalProfitValue,...PipData,SwapTax:TotalSwapTax})
    } 
    catch (err) {
        console.log(err)
        res.status(400).send({error:"Error on Return the Profit"});
    }
})

export default router;