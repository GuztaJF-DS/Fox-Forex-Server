export default function PipFunction(DataObject:{bid:number,ask:number},IsABuy:Boolean,Lots:number){
    
    let Bid=DataObject.bid;
    let Ask=DataObject.ask;

    if(IsABuy===true){//this mean the user is Buying
        let PipQtd=(Bid-Ask)*10000;
        let PipPrice=0.0001/Bid*(100000*Lots);
        let Profit=PipPrice*PipQtd;
        return {"PipQtd":PipQtd,"PipPrice":PipPrice,"Profit":Profit}
    }
    else{//and this mean the user is selling
        let PipQtd=(Ask-Bid)*10000;
        let PipPrice=0.0001/Ask*(100000*Lots);
        let Profit=PipPrice*PipQtd;
        return {"PipQtd":PipQtd,"PipPrice":PipPrice,"Profit":Profit}
    }
}

//{"symbol":"GBPUSD","ts":"1642601289172","bid":1.36317,"ask":1.36319,"mid":1.36318}
