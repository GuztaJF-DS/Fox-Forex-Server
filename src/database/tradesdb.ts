import {DataTypes,INTEGER,Model} from 'sequelize';
import {NewSequelize} from './connection';
import User from './userdb'

interface TradesInstance extends Model{
    id:number,
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

const Trade=NewSequelize.define<TradesInstance>('trade',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Lots:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    ExchangeType:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    Profit:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    StartDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    FinalDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    PipQtd:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    PipPrice:{
        type:DataTypes.FLOAT,
        allowNull:true
    },

    Finished:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },

    NextOpening:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onDelete:'cascade',
        references:{
            model:User,
            key:'id'
        }
    }
});

export default Trade;