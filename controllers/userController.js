import { where } from 'sequelize'
import db from '../models/index.js'
import bcrypt from 'bcrypt'
import { error } from 'console'
const User = db.User
export class UserController {
  createUser = async (req, res) => {
    try {
      const { username, password } = req.body
      const hashedPass = await bcrypt.hash(password, 10)
      const user = await User.create({ username, password: hashedPass })
      res.status(201).json({ message: 'Usuario creado', user });
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
      res.status(201).json({ message: 'Usuario logueado', success: true, token: 'asdasdasd' });
    } catch (error) {
      res.status(500).json({ message: 'Usuario|Contraseña invalida', success: false })
    }
  }
}