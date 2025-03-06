import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany } from '@sequelize/core/decorators-legacy';
import {Workout} from './workout';
import { NonAttribute } from 'sequelize';


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> { 
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  username!: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  passwordHash!: string;

  //reference to Workout model by userId
  @HasMany(() => Workout, 'userId')
  declare workouts?: NonAttribute<Workout[]>;
}

