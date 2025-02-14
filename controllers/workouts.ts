import {Router} from 'express'

const router = Router()
import {Workout} from "../models/index"

router.get('/api/workouts', async(req, res) => {
  const workouts = await Workout.findAll()
  res.json(workouts)
})

router.post('/api/workouts', async(req, res) => {
  const workout = await Workout.create(req.body)
  res.json(workout)
})

export default router
