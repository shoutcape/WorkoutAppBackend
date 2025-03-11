import { Router, Response, Request } from 'express';
import { User } from '../models';
import { hash } from 'bcryptjs';

const userRouter = Router();

//Fetch users
userRouter.get('/users', async (_req, res: Response) => {
  const users = await User.findAll();
  res.json(users);
});

//Add new User
userRouter.post('/users', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const saltRounds = 10;

  if (!password) {
    throw new Error('Password is required');
  }

  const passwordHash = await hash(password, saltRounds);

  //add user to database
  const newUser = await User.create({
    username: username,
    passwordHash: passwordHash,
  });
  res.status(201).json({ newUser });
});

export default userRouter;
