import jwt from 'jsonwebtoken'
import { Router, Request, Response } from "express";
import { User } from '../models';
import { compare } from 'bcryptjs';

const loginRouter = Router()

loginRouter.post('/', async (req: Request, res: Response) => {
  const {username, password} = req.body


  const user = await User.findOne({where: {username: username}})

  const passwordCorrect = user
    ? await compare(password, user.passwordHash)
    : false

  if (!passwordCorrect || !user) {
    res.status(401).json({error: 'Invalid username or password'})
    return
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  //Remember to add secret to env
  const token = jwt.sign(userForToken, process.env.SECRET!)

  res.status(200).json({ token, username: user.username})
})

export default loginRouter
