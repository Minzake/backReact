import db from '../models/index.js'
import bcrypt from 'bcrypt'

const { User } = db

const nat = { username: "nat", password: await bcrypt.hash('theoutsider', 10) }

User.create(nat)