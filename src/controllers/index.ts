import express from "express";
import user from './user';
import forex from './forex';
import trade from './trade'

const app=express();

app.use('/user',user);
app.use('/forex',forex);
app.use('/trade',trade)

export default app;