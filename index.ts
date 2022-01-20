import express from 'express';
import bodyParser from 'body-parser';
import index from './src/routes/index'
import {connect} from './src/websocket'
import db from './src/database/connection'
import 'dotenv/config';

const app=express()
db()
connect()
app.use(bodyParser.json())
app.use(index)

app.listen(process.env.PORT||3000,()=>{
    console.log(`server listening on port ${(process.env.PORT!='')?process.env.PORT:'3000'}`)
})