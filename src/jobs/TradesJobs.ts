import { Queue, Worker,QueueScheduler } from 'bullmq'

import Trades from '../database/tradesdb';

const RedisPort: number = parseInt(process.env.REDIS_PORT as string);
const RedisHost: string = (process.env.REDIS_HOST as string);

const myQueueScheduler = new QueueScheduler('Trade', { connection: {
    host: RedisHost,
    port: RedisPort,
  }});
export const queue=new Queue('Trade', { connection: {
    host: RedisHost,
    port: RedisPort,
  }});

export const worker = new Worker('Trade', async (job:any)=>{
    switch(job.data.type){
        case 'update':
            try {
                let tradeInfo=await Trades.findAll({where:{userId:job.data.body.userId}});
                let OldQuery=tradeInfo[tradeInfo.length-1];
                    
                let query={
                    Lots:OldQuery.Lots,
                    ExchangeType:OldQuery.ExchangeType,
                    Profit:job.data.body.Profit,
                    StartDate:OldQuery.StartDate,
                    FinalDate:job.data.body.FinalDate,            
                    PipQtd:job.data.body.PipQtd,
                    PipPrice:job.data.body.PipPrice,
                    SwapTax:OldQuery.SwapTax,
                    Finished:true,
                    NextOpening:0,
                    userId:job.data.body.userId
                }

                if(OldQuery.Finished===false){
                    const result=await Trades.update(query,{where:{id:OldQuery.id,userId:query.userId}})
                    if(result){
                        return {message:"Trade Sucessfully Finished"}
                    }
                }
                else{
                    return {message:"Trade Was Already Finished"}
                }
            } catch (err) {
                return Promise.resolve(err);
            }
        break;
        
        case 'create':
            try {
                const result = await Trades.create(job.data.query)
                if(result){
                    return Promise.resolve({message:"Trade Sucessfully created"});
                }
            } catch (err) {
                return Promise.resolve(err);
            }
        default:
            break;
    }
        
  }, { connection: {
    host: RedisHost,
    port: RedisPort,
  }});