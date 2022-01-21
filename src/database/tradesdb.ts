import {Schema,Document,Model,model} from 'mongoose'

export interface ITrades extends Document{
    Lots:number,
    ExgangeType:boolean,
    Profit:number,
    Date:Date,
    PipQtd:number,
    PipPrice:number,
    SwapTax:number,
    Finished:boolean
}

const TradesSchema: Schema=new Schema({
    Lots:{ type: Number, required: true },
    ExgangeType:{ type: Boolean, required: true },
    Profit:{ type: Number},
    Date:{ type: Date, required: true },
    PipQtd:{ type: Number },
    PipPrice:{ type: Number },
    SwapTax:{ type: Number },
    Finished:{ type: Boolean, required: true },
})

export const Trades:Model<ITrades>=model('Trades',TradesSchema)