import mongoose from "mongoose";

main().catch((err:string)=>console.log(err));

export default async function main() {
    await mongoose.connect('mongodb://localhost:27017/testing')
    var db=mongoose.connection;
}
