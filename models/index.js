import { Sequelize, DataTypes } from 'sequelize'
import User from './UserModel.js'
import dotenv from 'dotenv'
const environment = process.env.NODE_ENV || 'development'

dotenv.config({ path: `.env.${environment}` })

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  define: {
    underscored: true
  }
})

sequelize.authenticate().then(() => {
  console.log('Database connected to discover')
}).catch((err) => {
  console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = User(sequelize, DataTypes)

export default db