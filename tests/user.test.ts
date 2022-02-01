/*import {User} from '../src/database/userdb';
import db from '../src/database/connection'

beforeAll (()=>db())

describe("UserTests",()=>{
    it('UserUpdate',async ()=>{
        const OldQuery=await User.find({});
        const query={
            currentProfit: 20,
            currentLots: 0.75,
        }
         
        User.findOneAndUpdate(OldQuery,query,{upsert:true},function(err,doc){
            let Result;
            if(err){
                console.log(err)
                Result=err
            }else{
                Result="All Right"
            }

            expect(Result).toBe("All Right")
        })
    })

    it('UsersGet',async ()=>{
        const query=await User.find({});
        let Result;
        if(Object.values(query).length===0){
            Result="Nothing"
        }else{
             Result="All Right"
        }
        expect(Result).toBe("All Right")
    })
})*/