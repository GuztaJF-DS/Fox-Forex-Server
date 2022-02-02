import {DataTypes,Model} from 'sequelize';
import {NewSequelize} from './connection'

interface UserInstance extends Model{
    id: number;
    currentProfit:number;
    currentLots:number;
    userName:string;
    password:string;
}

const User=NewSequelize.define<UserInstance>('user',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    currentProfit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    currentLots:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
});

export default User;