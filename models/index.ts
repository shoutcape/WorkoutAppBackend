import Workout from "./workout";
import User from "./user"

//Sync models
Workout.sync()
User.sync()

//Define relations
User.hasMany(Workout, {foreignKey: 'userId'})
Workout.belongsTo(User, {foreignKey: 'userId'})


export {
  Workout,
  User
}
