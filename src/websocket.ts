import WebSocket from 'ws';
import { Trades } from './database/tradesdb';

var reconnectInterval  = 1000 * 10

async function getLastOpening(){
  let trade=await Trades.find({})
  if(trade[trade.length-1].Finished==false){
    return {"LastOpening":trade[trade.length-1].NextOpening,
    "Lots":trade[trade.length-1].Lots,
    "ExchangeType":trade[trade.length-1].ExchangeType,
    "SwapTax":trade[trade.length-1].SwapTax,
    "StartDate":trade[trade.length-1].StartDate
  }
  }
  else{
    return false
  }
}

export function connect(io:any){
  try{
    const MarketDataWs = new WebSocket('wss://marketdata.tradermade.com/feedadv');
    io.setMaxListeners(0);


    MarketDataWs.on('open', function open() {
        MarketDataWs.send("{\"userKey\":\""+process.env.LIVEAPI_TOKEN+"\", \"symbol\":\"GBPUSD\"}");
    });

    MarketDataWs.on('close', function() {
      console.log('socket close : will reconnect in ' + reconnectInterval );
      setTimeout(connect, reconnectInterval)
    });

    io.on("connection", (socket: any)=> { 
      socket.on("SendChecker",async ()=>{
        let lastOpening = await getLastOpening()
        if(lastOpening!==false){
          socket.emit("sendQuery",lastOpening)
        }
      })

      console.log('connected '+socket.id)
      MarketDataWs.on('message', function incoming(data:any) {
        socket.emit("sendData",data.toString())
      });
    });
  }
  catch(err){
    console.log(err);
  }   
};