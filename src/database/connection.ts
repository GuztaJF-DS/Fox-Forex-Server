import mongoose from "mongoose";

main().catch((err:string)=>console.log(err));

export default async function main() {
    await mongoose.connect('mongodb://localhost:27017/test')
    var db=mongoose.connection;
}
