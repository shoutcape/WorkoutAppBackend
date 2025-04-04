import { Options, Sequelize } from "sequelize"
import config from './config'

//connect to DB
if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sequelizeOptions: Options = {
  dialect: 'postgres',
  ssl: config.ssl,
  logging: false,
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
