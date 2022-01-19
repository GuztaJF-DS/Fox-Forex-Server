import express from 'express';
import index from './src/routes/index'
import {connect} from './src/websocket';
import 'dotenv/config';

const app=express()

connect()
app.use(index)

app.listen(process.env.PORT||3000,()=>{
    console.log(`server listening on port ${(process.env.PORT!='')?process.env.PORT:'3000'}`)
})