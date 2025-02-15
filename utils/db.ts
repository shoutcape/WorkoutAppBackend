import { Sequelize } from "sequelize"
import config from './config'


//connect to DB
if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

export {sequelize}
