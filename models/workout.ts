import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasOne, BelongsTo } from '@sequelize/core/decorators-legacy';
import {User} from './user';
import { NonAttribute } from 'sequelize';

export class Workout extends Model<InferAttributes<Workout>, InferCreationAttributes<Workout>> { 
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @BelongsTo(() => User, 'userId')
  declare user?: NonAttribute<User>

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number 

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string

  @Attribute(DataTypes.JSONB)
  declare exercises: CreationOptional<Object[]>

  @Attribute(DataTypes.DATEONLY)
  declare date: string
}
