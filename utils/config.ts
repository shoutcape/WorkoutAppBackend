import dotenv from 'dotenv'
dotenv.config()

//true if production, false if development
const isProduction = process.env.NODE_ENV !== 'development'

const config = {
  DATABASE_URL:isProduction 
    ? process.env.DATABASE_URL
    : 'postgres://postgres:salasana@localhost:5432/postgres' ,
  PORT: process.env.PORT || 3000,
  ssl: isProduction
}

export default config
