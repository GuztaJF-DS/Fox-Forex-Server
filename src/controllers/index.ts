import express from "express";
import user from './user';
import forex from './forex';
import trade from './trade'
var cors = require('cors')

const app=express();
app.use(cors());
app.use('/user',user);
app.use('/forex',forex);
app.use('/trade',trade)

module.exports =  app;