import dotenv from 'dotenv'
dotenv.config()

//true if production, false if development
const production = process.env.NODE_ENV === 'production'

const config = {
  DATABASE_URL: production
    ? process.env.DATABASE_URL
    : 'postgres://postgres:salasana@localhost:5432/postgres',
  PORT: process.env.PORT || 3000,
  ssl: production
}

export default config
