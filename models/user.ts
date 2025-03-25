import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class User extends Model {
  public id!: string;
  public username!: string;
  public passwordHash!: string; 
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

export default User;
