export default function SwapFunction(PipPrice:number,IsLong:boolean,Lots:number,SwapTax:number,TotalNights:number){
    if(IsLong===true){
        return (PipPrice*SwapTax*TotalNights)/10
    }
    else{
        return Lots*SwapTax*TotalNights
    }
}