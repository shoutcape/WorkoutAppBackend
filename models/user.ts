import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
  },
);

export default User;
