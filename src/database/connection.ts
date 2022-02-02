import {Sequelize} from 'sequelize'
import 'dotenv/config';

const DBNameEnv: string = (process.env.DBNAME as string);
const DBUserNameEnv: string = (process.env.DB_USERNAME as string);
const DBPasswordEnv: string = (process.env.DB_PASSWORD as string);
const DBHostEnv: string = (process.env.DB_HOST as string);

export const NewSequelize=new Sequelize(DBNameEnv,DBUserNameEnv,DBPasswordEnv,{
    host:DBHostEnv,
    dialect:'postgres',
    port: 5432,
    logging: false
});

export async function db(){
    try {
        await NewSequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}