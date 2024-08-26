import { Sequelize, DataTypes } from 'sequelize'
import User from './UserModel.js'
import dotenv from 'dotenv'
import sequelize from '../config/database.js'
const environment = process.env.NODE_ENV || 'development'

dotenv.config({ path: `.env.${environment}` })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = User(sequelize, DataTypes)

export default db