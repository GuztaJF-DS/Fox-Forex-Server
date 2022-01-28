import {Trades} from '../src/database/tradesdb'

beforeAll (()=>db())

describe('TradeTests',()=>{
    it("createUnfishedTable",async () => {
        const query={
            Lots:1,
            ExchangeType:true,
            StartDate:"01-01-2022-07:10",
            SwapTax:0.5,
            NextOpening:1.36127
        }
         
        Trades.findOneAndUpdate({},query,{upsert:true},function(err:any,docs:any){
            let Result;
            if(err){
                Result=err
            }else{
                Result="All Right"
            }

            expect(Result).toBe("All Right")
        })
    })

    it("updatesFinishedTable",()=>{

        Trades.find({}, function (err:any, docs:any) {
            let OldQuery=docs[docs.length-1];
            console.log(docs)


            let query={
                Lots:OldQuery.Lots,
                ExchangeType:OldQuery.ExchangeType,
                Profit: 6.03999, 
                StartDate:OldQuery.StartDate,
                FinalDate: "2022-01-27T10:30:10.307Z", 
                PipQtd: 0.1509999999993461,
                PipPrice: 40,
                SwapTax:OldQuery.SwapTax,
                Finished:true,
                NextOpening:0
            }

            Trades.updateOne({_id:OldQuery._id},query,{upsert:false},function(err:any){
                let Result;
                if(err){
                    Result=err
                }else{
                    Result="All Right"
                }
                console.log({_id:OldQuery._id})

                expect(Result).toBe("All Right")
            })
        })
    })
})
