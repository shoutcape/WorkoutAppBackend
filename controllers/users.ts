import { Router } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt'

const userRouter = Router();

//Fetch users
userRouter.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

//Add new User
userRouter.post('/users', async (req, res) => {
  const { username, password } = req.body
  const saltRounds = 10
  if (!password) {
    res.status(400).json({ error: 'Password is required '})
    return
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log('Error generating hashSalt', err);
      res.status(500).json({ error: 'Error generating hashSalt' });
      return;
    }
    //generate hash of password
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log('Error generating hash', err);
        res.status(500).json({error: 'Error generating hash'})
        return
      }
      console.log(hash)
  //add user to database
    User.create({
      username: username,
      passwordHash: hash
    })

    res.json({ message: salt });
    })
  });
})

export default userRouter;
