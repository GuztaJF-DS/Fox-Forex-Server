import express from 'express';
import bodyParser from 'body-parser';
import index from './src/controllers/index'
import {connect} from './src/websocket'
import {db} from './src/database/connection'
import 'dotenv/config';

const cors = require('cors');

const app=express()

db()
let http = require("http").Server(app);
let io = require("socket.io")(http, {
    cors: {
        credentials: true, origin: '*'
    }
  });
connect(io);
app.use(bodyParser.json())
app.use(index)

console.log(process.env.LIVEAPI_TOKEN)

app.listen(process.env.PORT||3000,()=>{
    console.log(`server listening on ${(process.env.PORT!='')?process.env.PORT:'3000'}`)
})

const server = http.listen(8080, function() {
  console.log("listening on *:8080");
});
  