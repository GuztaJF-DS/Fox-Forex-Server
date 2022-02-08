import WebSocket from 'ws';

var reconnectInterval  = 1000 * 10

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
      MarketDataWs.on('message', function incoming(data:any) {
        socket.emit("sendData",data.toString())
      });
    });
  }
  catch(err){
    console.log(err);
  }  
};  