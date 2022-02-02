import express,{Request,Response} from 'express';
import User from '../database/userdb';
import bcrypt from 'bcrypt';

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
        bcrypt.hash(req.body.password,10,async function(err,hash){
            const query={
                currentProfit: req.body.currentProfit,
                currentLots: req.body.currentLots,
                userName:req.body.userName,
                password:hash
            }
            const checking=await User.findAll({where: {userName:query.userName,password:query.password}});
            if(Object.values(checking).length==0){
                const result =await User.create(query)
                if(result){
                    res.status(200).send({message:"sucessfully Created"});
                }
            }
            else{
                res.status(200).send({error:"UserName already Exists"});
            }
        })        
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:"Error on creating a new Account"});
    }
});

router.post('/login',async(req:Request,res:Response)=>{  
    try{
        const body=req.body as requestBodyUser;
        const FindUser=await User.findOne({where: {userName:req.body.userName}});
        if(FindUser!=null){
            bcrypt.compare(req.body.password,FindUser.password,async function(err,result){
                if(result===true){
                    const query={
                        id:FindUser.id,
                        currentProfit:FindUser.currentProfit,
                        currentLots:FindUser.currentLots,
                        userName:FindUser.userName,
                        password:FindUser.password
                    }
                    res.status(200).send(query)
                }
                else{
                    res.status(200).send({error:"Wrong Password"})
                }
                if(err){
                    console.log(err)
                    res.status(400).send({error:"Error on bcrypt"});
                }
            })
        }else{
            res.status(200).send({error:"User Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:"Error on Login"});
    }
});

router.post("/update",async(req:Request,res:Response)=>{
    try{
        const body=req.body as requestBodyUser;
        const query={
            currentProfit: req.body.currentProfit,
            currentLots: req.body.currentLots,
        }

        const UserToUpdateData=await User.findOne({where: {userName:req.body.userName}});
        if(UserToUpdateData!==null){
            bcrypt.compare(req.body.password,UserToUpdateData.password,async function(err,result){
                if(result===true){
                    await UserToUpdateData?.update(query)
                    const result = await UserToUpdateData?.save()

                    if(result){
                        res.status(200).send({message:"Updated Sucessfully"});
                    }
                }
                else{
                    res.status(200).send({error:"Wrong Password"})
                }
                if(err){
                    console.log(err)
                    res.status(400).send({error:"Error on bcrypt"});
                }
            })
        }else{
            res.status(200).send({error:"User Not Found"})
        }
        
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:"Error on update user data"});
    }
})

router.get("/get",async(req:Request,res:Response)=>{
    try {
        const result=await User.findAll({});
        if(result){
            res.status(200).send(result);
        }
    } 
    catch(err) {
        console.log(err);
        res.status(400).send({error:"Error on get user data"});
    }
})


export default router;