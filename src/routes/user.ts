import express from 'express';

const router=express();

router.get('/',async(req,res)=>{
    res.status(200).send({message:'test'})
})

export default router;