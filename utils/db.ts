import { Sequelize } from "@sequelize/core"
import config from './config'
import { PostgresDialect } from "@sequelize/postgres";
import { User, Workout } from "../models";


//connect to DB
if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const sequelize = new Sequelize({
  dialect: PostgresDialect,
  url: config.DATABASE_URL,
  ssl: config.ssl,
  clientMinMessages: 'notice',
  models: [User, Workout]
})

export {sequelize}
