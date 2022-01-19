import WebSocket,{WebSocketServer} from 'ws'
import PipFunction from './middleware/PipFunction';
import SwapFunction from './middleware/SwapFunction'; 

var reconnectInterval  = 1000 * 10

export function connect(){
    const MarketDataWs = new WebSocket('wss://marketdata.tradermade.com/feedadv');

    const wss=new WebSocketServer({
      port:8080,
    })
    
    wss.on('connection',(ws: WebSocket)=>{
      ws.on('message', (message) => {
        console.log('received: %s', message);
      });

      ws.on("close", function close() {
        console.log("Disconnected");
    });
    })

   

    MarketDataWs.on('open', function open() {
        MarketDataWs.send("{\"userKey\":\""+process.env.API_TOKEN+"\", \"symbol\":\"GBPUSD\"}");
    });

    MarketDataWs.on('close', function() {
    console.log('socket close : will reconnect in ' + reconnectInterval );
    setTimeout(connect, reconnectInterval)
    });

    MarketDataWs.on('message', function incoming(data:any) {

      if(data.toString()!=="Connected"){
        let PipData=PipFunction(JSON.parse(data.toString()),false,1)
        let SwapTax=SwapFunction(PipData.PipPrice,true,1,0.51,1)
      }

        wss.clients.forEach((client)=>{
            if(client.readyState===WebSocket.OPEN){
                client.send(data.toString())
            }
        })
    });
};