import { Model, DataTypes } from "sequelize"
import { sequelize } from '../utils/db'
import User from "./user"

class Workout extends Model { }

Workout.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
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
    modelName: 'Workout',
    tableName: 'workouts'
  })


export default Workout
