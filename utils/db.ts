import { Options, Sequelize } from "sequelize"
import config from './config'
import { SequelizeType } from "umzug";


//connect to DB
if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sequelizeOptions: Options = {
  dialect: 'postgres',
  ssl: config.ssl,
}


if (config.ssl) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}


const sequelize = new Sequelize(config.DATABASE_URL, sequelizeOptions)

export {sequelize}
