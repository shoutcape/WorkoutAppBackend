import {Router} from 'express'

const workoutRouter = Router()
import {Workout} from "../models"

workoutRouter.get('/workouts', async(req, res) => {
  const workouts = await Workout.findAll()
  res.json(workouts)
})

workoutRouter.get('/workouts/:id', async(req, res) => {
  const workouts = await Workout.findByPk(req.params.id)
  res.json(workouts)
})

workoutRouter.post('/workouts', async(req, res) => {
  const workout = await Workout.create(req.body)
  res.json(workout)
})

workoutRouter.delete('/workouts/:id', async(req, res) => {
  const workoutId = req.params.id
  const workout = await Workout.destroy({where: {id: workoutId}})
  res.json(workout)
})

export default workoutRouter
