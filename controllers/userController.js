import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()
const User = db.User
const jwtSecret = process.env.JWT_SECRET || 'jwt'
export class UserController {
  createUser = async (req, res) => {
    try {
      const { username, password } = req.body
      const hashedPass = await bcrypt.hash(password, 10)
      const user = await User.create({ username, password: hashedPass })
      res.status(201).json({ message: 'Usuario creado', user })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  login = async (req, res) => {
    try {
      const { username, password } = req.body
      const result = await User.findOne({ where: { username } })
      if (!result) { throw error }
      if (!await bcrypt.compare(password, result.password)) {
        throw error
      }
      const payload = { id: result.id, username: result.username }
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' })

      res.status(201).json({ message: 'Usuario logueado', success: true, token })
    } catch (error) {
      res.status(500).json({ message: 'Usuario o Contraseña invalida', success: false })
    }
  }
}