import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { User } from '../models';
import { compare } from 'bcryptjs';
import config from '../utils/config';
import middleware, { AuthRequest } from '../utils/middleware';

const loginRouter = Router();

loginRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username: username } });

  const passwordCorrect = user
    ? await compare(password, user.passwordHash)
    : false;

  if (!passwordCorrect || !user) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  const userForToken = {
    id: user.id,
    username: user.username,
  };

  //Remember to add secret to env
  const token = jwt.sign(
    userForToken,
    config.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );

  res.status(200).json({ id: user.id, username: user.username, token });
});

loginRouter.post('/auth/verify', middleware.checkJwt, async (req: AuthRequest, res: Response) => {
  const userData = req.auth;
  
  // Return response with user data
  res.status(200).json({ 
    valid: true, 
    user: userData 
  });
})

export default loginRouter;
