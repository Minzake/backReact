import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export default (sequelize) => {
  const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
})}
