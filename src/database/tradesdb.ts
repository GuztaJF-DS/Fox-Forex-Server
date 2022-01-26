import {Schema,Document,Model,model} from 'mongoose'

export interface ITrades extends Document{
    Lots:number,
    ExchangeType:boolean,
    Profit:number,
    StartDate:Date,
    FinalDate:Date,
    PipQtd:number,
    PipPrice:number,
    SwapTax:number,
    Finished:boolean,
    NextOpening:number
}

const TradesSchema: Schema=new Schema({
    Lots:{ type: Number, required: true },
    ExchangeType:{ type: Boolean, required: true },
    Profit:{ type: Number },
    StartDate:{ type: Date, },
    FinalDate:{ type: Date },
    PipQtd:{ type: Number },
    PipPrice:{ type: Number },
    SwapTax:{ type: Number },
    Finished:{ type: Boolean, required: true },
    NextOpening:{ type: Number }
})

export const Trades:Model<ITrades>=model('Trades',TradesSchema)