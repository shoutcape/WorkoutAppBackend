import Workout from "./workout";
import User from "./user"

//const syncModels = async() => {
////Sync models
//await User.sync()
//await Workout.sync()
//}
//
//syncModels()

//Define relations
User.hasMany(Workout, {foreignKey: 'userId'})
Workout.belongsTo(User, {foreignKey: 'userId'})


export {
  Workout,
  User
}
