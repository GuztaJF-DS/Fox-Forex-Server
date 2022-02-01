import express,{Request,Response} from 'express';
import User from '../database/userdb'

const router=express();  

type requestBodyUser={
    id:number,
    currentProfit:number,
    currentLots:number,
    userName:string,
    password:string
}

router.post('/new',async(req:Request,res:Response)=>{  
    try{
        const body=req.body as requestBodyUser;
        const query={
            currentProfit: req.body.currentProfit,
            currentLots: req.body.currentLots,
            userName:req.body.userName,
            password:req.body.password
        }
        const checking=await User.scope('excludePassword').findAll({where: {userName:query.userName,password:query.password}});
        if(Object.values(checking).length==0){
            const result =await User.create(query)
            if(result){
                res.status(200).send({message:"sucessfully Created"});
            }
        }
        else{
            res.status(200).send({message:"UserName already Exists"});
        }
        
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:err});
    }
});

router.post('/login',async(req:Request,res:Response)=>{  
    try{
        const body=req.body as requestBodyUser;
        const query={
            userName:req.body.userName,
            password:req.body.password
        }
        const result=await User.scope('excludePassword').findAll({where: {userName:query.userName,password:query.password}});
        if(result){
            res.status(200).send(result[0]);
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:err});
    }
});

router.get("/get",async(req:Request,res:Response)=>{
    try {
        const result=await User.scope('excludePassword').findAll({});
        if(result){
            res.status(200).send(result[0]);
        }
    } 
    catch(err) {
        console.log(err);
        res.status(400).send({error:"Error on get the Register"});
    }
})


export default router;