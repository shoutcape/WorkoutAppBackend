import { Model, DataTypes } from "sequelize"
import { sequelize } from '../utils/db'

class Workout extends Model { }

Workout.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exercises: {
    type: DataTypes.JSONB
  },
  date: {
    type: DataTypes.DATEONLY
  }

}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'workout'
  })

export default Workout
