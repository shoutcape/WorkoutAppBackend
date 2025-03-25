import { Optional } from 'sequelize';
import { sequelize } from './db';
import dotenv from 'dotenv';
import { User, Workout } from '../models';
import { v4 as randomUUID } from 'uuid';

dotenv.config();


// Define the attributes for the User model
interface UserAttributes {
  id: string;
  username: string;
  passwordHash: string;
}

// Define the creation attributes for the Workout model
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// Function to add workouts to the database
const addWorkouts = async(): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await User.sync({force: true})
    await Workout.sync({force: true})
    console.log('both models were reset')

    const userID1 = "af20f26b-b31e-4056-b21d-befdeb705c6c" 
    const userID2 = "f65ca8ba-b1b2-4c95-aeb0-f95885a6e189"

    const users: UserCreationAttributes[] = [
      {
        id: userID1,
        username: 'john_doe',
        passwordHash: 'hashed_password_1'
      },
      {
        id: userID2,
        username: 'jane_doe',
        passwordHash: 'hashed_password_2'
      }
    ];

    await User.bulkCreate(users);
    console.log('Users have been added')

    const workouts = [
      {
        userId: userID2,
        name: 'Push Day',
        exercises: [
          {
            id: randomUUID(),
            name: 'Overhead Shoulder Press',
            sets: [
              { id: randomUUID(), reps: 8, weight: 95 },
              { id: randomUUID(), reps: 8, weight: 95 },
              { id: randomUUID(), reps: 8, weight: 95 },
              { id: randomUUID(), reps: 8, weight: 95 },
            ],
          },
          {
            id: randomUUID(),
            name: 'Tricep Dips',
            sets: [
              { id: randomUUID(), reps: 10 },
              { id: randomUUID(), reps: 10 },
              { id: randomUUID(), reps: 10 },
            ],
          },
          {
            id: randomUUID(),
            name: 'Incline Dumbbell Press',
            sets: [
              { id: randomUUID(), reps: 12, weight: 60 },
              { id: randomUUID(), reps: 12, weight: 60 },
              { id: randomUUID(), reps: 12, weight: 60 },
            ],
          },
        ],
        date: new Date('2024-02-15'),
      },
      {
        userId: userID1,
        name: 'Pull Day',
        exercises: [
          {
            id: randomUUID(),
            name: 'Deadlifts',
            sets: [
              { id: randomUUID(), reps: 6, weight: 245 },
              { id: randomUUID(), reps: 6, weight: 245 },
              { id: randomUUID(), reps: 6, weight: 245 },
              { id: randomUUID(), reps: 6, weight: 245 },
            ],
          },
          {
            id: randomUUID(),
            name: 'Lat Pulldown',
            sets: [
              { id: randomUUID(), reps: 10, weight: 120 },
              { id: randomUUID(), reps: 10, weight: 120 },
              { id: randomUUID(), reps: 10, weight: 120 },
            ],
          },
          {
            id: randomUUID(),
            name: 'Barbell Rows',
            sets: [
              { id: randomUUID(), reps: 8, weight: 155 },
              { id: randomUUID(), reps: 8, weight: 155 },
              { id: randomUUID(), reps: 8, weight: 155 },
            ],
          },
        ],
        date: new Date('2024-03-01'),
      },
      {
        userId: userID1,
        name: 'Yoga & Mobility',
        exercises: [
          {
            id: randomUUID(),
            name: 'Downward Dog',
            sets: [
              { id: randomUUID(), duration: '30 sec' },
              { id: randomUUID(), duration: '30 sec' },
              { id: randomUUID(), duration: '30 sec' },
            ],
          },
          {
            id: randomUUID(),
            name: 'Pigeon Pose',
            sets: [
              { id: randomUUID(), duration: '45 sec' },
              { id: randomUUID(), duration: '45 sec' },
            ],
          },
          {
            id: randomUUID(),
            name: 'Hip Mobility Stretch',
            sets: [
              { id: randomUUID(), duration: '60 sec' },
              { id: randomUUID(), duration: '60 sec' },
              { id: randomUUID(), duration: '60 sec' },
            ],
          },
        ],
        date: new Date('2024-03-10'),
      },
      {
        userId: userID2,
        name: 'Core & Abs',
        exercises: [
          {
            id: randomUUID(),
            name: 'Crunches',
            sets: [
              { id: randomUUID(), reps: 20 },
              { id: randomUUID(), reps: 20 },
              { id: randomUUID(), reps: 20 },
            ],
          },
          {
            id: randomUUID(),
            name: 'Leg Raises',
            sets: [
              { id: randomUUID(), reps: 15 },
              { id: randomUUID(), reps: 15 },
              { id: randomUUID(), reps: 15 },
            ],
          },
          {
            id: randomUUID(),
            name: 'Russian Twists',
            sets: [
              { id: randomUUID(), reps: 30, weight: 20 },
              { id: randomUUID(), reps: 30, weight: 20 },
              { id: randomUUID(), reps: 30, weight: 20 },
            ],
          },
        ],
        date: new Date('2024-03-20'),
      },
    ];

    await Workout.bulkCreate(workouts);
    console.log('Users and workouts have been added successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close()
  }
}

// Run the function to add workouts
  addWorkouts();
