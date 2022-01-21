import express,{Request,Response} from 'express';
import {User} from '../database/userdb'

const router=express();  

type requestBodyUser={
    currentProfit:number,
    currentLots:number
}

router.post('/update',async(req:Request,res:Response)=>{  
    try{
        const body=req.body as requestBodyUser;
        const OldQuery=await User.find({});
        const query={
            currentProfit: req.body.currentProfit,
            currentLots: req.body.currentLots,
        }
        User.findOneAndUpdate(OldQuery,query,{upsert:true},function(err){
            if(err){
                console.log(err);
                res.status(400).send({error:"Error on Update Register"});
            }else{
                res.status(200).send({message:"sucessfully Updated"});
            }
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Update Register (Catch)"});
    }
});

router.get("/get",async(req:Request,res:Response)=>{
    try {
        const query=await User.find({});
        if(Object.values(query).length===0){
            res.status(200).send({currentProfit:0,currentLots:0});
        }else{
            res.status(200).send({currentProfit:query[0].currentProfit,currentLots:query[0].currentLots});
        }
    } 
    catch (err) {
        console.log(err);
        res.status(400).send({error:"Error on get the Register"});
    }
})

export default router;