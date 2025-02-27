import {Router} from 'express'

const workoutRouter = Router()
import {Workout} from "../models"

workoutRouter.get('/api/workouts', async(req, res) => {
  const workouts = await Workout.findAll()
  res.json(workouts)
})

workoutRouter.get('/api/workouts/:id', async(req, res) => {
  const workouts = await Workout.findByPk(req.params.id)
  res.json(workouts)
})

workoutRouter.post('/api/workouts', async(req, res) => {
  const workout = await Workout.create(req.body)
  res.json(workout)
})

workoutRouter.delete('/api/workouts/:id', async(req, res) => {
  const workoutId = req.params.id
  const workout = await Workout.destroy({where: {id: workoutId}})
  res.json(workout)
})

export default workoutRouter
