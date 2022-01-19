import express from 'express';
import index from './scr/routes/index'
import {connect} from './scr/websocket';
import 'dotenv/config';

const app=express()

app.use(index)
connect()

app.listen(process.env.PORT||3000,()=>{
    console.log(`server listening on port ${(process.env.PORT!='')?process.env.PORT:'3000'}`)
})