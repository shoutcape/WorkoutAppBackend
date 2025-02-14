import { Sequelize } from "sequelize"
import config from './config.ts'

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

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { connectToDatabase, sequelize}
