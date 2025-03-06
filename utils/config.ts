import dotenv from 'dotenv'
dotenv.config()

//true if production, false if development
const development = process.env.NODE_ENV === 'development'

const config = {
  DATABASE_URL: development
    ? 'postgres://postgres:salasana@localhost:5432/postgres'
    : process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  ssl: !development
}

export default config
