import express from "express";
import user from './user';
import forex from './forex';

const app=express();

app.use('/user',user);
app.use('/forex',forex);

export default app;