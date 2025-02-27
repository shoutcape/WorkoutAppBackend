import Workout from "./workout";
import User from "./user"

const syncModels = async() => {
//Sync models
await User.sync({ force: true })
await Workout.sync({ force: true })
}

syncModels()
console.log('both models were recreated')

//Define relations
User.hasMany(Workout, {foreignKey: 'userId'})
Workout.belongsTo(User, {foreignKey: 'userId'})


export {
  Workout,
  User
}
