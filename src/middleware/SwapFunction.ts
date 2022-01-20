function SwapFunction(PipPrice:number,IsABuy:boolean,Lots:number,SwapTax:number,TotalNights:number){
    if(IsABuy===true){
        return (PipPrice*(SwapTax*TotalNights))/10
    }
    else{
        return Lots*(SwapTax*TotalNights)
    }
}

module.exports=SwapFunction;