import express from 'express'
import sequelize from '../config/database.js'
import routes from '../routes/index.js'
import dotenv from 'dotenv'
import db from '../models/index.js'
import cors from 'cors'

// Cargar variables desde .env
dotenv.config()


// Usar las variables de entorno
const port = process.env.PORT || 3000


const app = express()

app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use('/api', routes)

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected...')

    db.sequelize.sync({ alter: true })

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startServer()
