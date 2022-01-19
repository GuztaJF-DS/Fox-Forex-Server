import express from 'express';
import {IUser,User} from '../database/userdb'

const router=express();  

router.get('/',async(req,res)=>{  
    const user: IUser = await User.create({
        currentProfit: 0,
        currentLots: 0,
    });
    res.status(200).send({message:user.currentLots})
})

export default router;