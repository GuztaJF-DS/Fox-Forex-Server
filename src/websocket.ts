import WebSocket from 'ws';
const PipFunction=require('../src/middleware/pipFunction');
const SwapFunction=require('../src/middleware/swapFunction');
import { Trades } from './database/tradesdb';

var global = "false";

    function setGlobalResponse(message:string){
      global = message;
    };

var reconnectInterval  = 1000 * 10


export function connect(io:any){
    const MarketDataWs = new WebSocket('wss://marketdata.tradermade.com/feedadv');
    
    io.setMaxListeners(0);
    io.on("connection", function(socket: any) {
      socket.emit("ass",'asd')
    });
  

    MarketDataWs.on('open', function open() {
        MarketDataWs.send("{\"userKey\":\""+process.env.LIVEAPI_TOKEN+"\", \"symbol\":\"GBPUSD\"}");
    });

    MarketDataWs.on('close', function() {
    console.log('socket close : will reconnect in ' + reconnectInterval );
    setTimeout(connect, reconnectInterval)
    });

    io.on("connection", (socket: any)=> { 
      MarketDataWs.on('message', function incoming(data:any) {
        console.log(data.toString())
          socket.emit("ass",data.toString())
      });
    });
};