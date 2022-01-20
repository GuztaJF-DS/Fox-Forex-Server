function PipFunction(DataObject:{bid:number,ask:number,mid:number},IsABuy:Boolean,Lots:number){
    
    let Bid=DataObject.bid;
    let Ask=DataObject.ask;
    let Mid=DataObject.mid;
    let PipQtd=0

    if(IsABuy===true){//this mean the user is Buying
        PipQtd=(Bid-Ask)*10000;
    }
    else{//and this mean the user is selling
        PipQtd=(Ask-Bid)*10000;
    }

    let PipPrice=0.0001*(100000*Lots);
    let Profit=PipPrice*PipQtd;

    return {"PipQtd":PipQtd,"PipPrice":PipPrice,"Profit":Profit}
}

module.exports=PipFunction