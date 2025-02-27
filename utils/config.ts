import dotenv from 'dotenv'
dotenv.config()

const isDevelopment = process.env.NODE_ENV === 'development'

const config = {
  DATABASE_URL: isDevelopment
    ? 'postgres://postgres:salasana@localhost:5432/testdatabase' 
    : process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  ssl: !isDevelopment
}

export default config
