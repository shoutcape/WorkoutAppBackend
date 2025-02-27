import { Router } from 'express';
import { User } from '../models';

const userRouter = Router();

userRouter.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.post('/users', async (req, res) => {
  const { username, passwordHash } = req.body
  const newUser = await User.create({ username, passwordHash})
  res.status(201).json(newUser)
})

export default userRouter;
