import express from 'express';
import sequelize from '../config/database.js';
import routes from '../routes/index.js';
import dotenv from 'dotenv';

// Cargar variables desde .env
dotenv.config();

// Usar las variables de entorno
const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    
    app.listen(port, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
