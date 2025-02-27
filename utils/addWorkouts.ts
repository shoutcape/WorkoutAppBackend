import { Optional } from 'sequelize';
import { sequelize } from './db';
import dotenv from 'dotenv';
import { User, Workout } from '../models';

dotenv.config();

// Define the attributes for the Workout model
interface WorkoutAttributes {
  id: number;
  userId: number;
  name: string;
  exercises: object;
  date: string;
}

// Define the creation attributes for the Workout model
interface WorkoutCreationAttributes extends Optional<WorkoutAttributes, 'id'> { }

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  passwordHash: string;
}

// Define the creation attributes for the User model
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// Function to add workouts to the database
const addWorkouts = async(): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await Workout.sync();
    await User.sync();

    const users: UserCreationAttributes[] = [
      {
        id: 1,
        username: 'john_doe',
        passwordHash: 'hashed_password_1'
      },
      {
        id:2,
        username: 'jane_doe',
        passwordHash: 'hashed_password_2'
      }
    ];

    await User.bulkCreate(users);

    const workouts: WorkoutCreationAttributes[] = [
      {
        userId: 1,
        name: 'Push Day',
        exercises: [
          {
            id: 7,
            name: 'Overhead Shoulder Press',
            sets: [
              { id: 20, reps: 8, weight: 95 },
              { id: 21, reps: 8, weight: 95 },
              { id: 22, reps: 8, weight: 95 },
              { id: 23, reps: 8, weight: 95 },
            ],
          },
          {
            id: 8,
            name: 'Tricep Dips',
            sets: [
              { id: 24, reps: 10 },
              { id: 25, reps: 10 },
              { id: 26, reps: 10 },
            ],
          },
          {
            id: 9,
            name: 'Incline Dumbbell Press',
            sets: [
              { id: 27, reps: 12, weight: 60 },
              { id: 28, reps: 12, weight: 60 },
              { id: 29, reps: 12, weight: 60 },
            ],
          },
        ],
        date: '2023-10-20',
      },
      {
        userId: 2,
        name: 'Pull Day',
        exercises: [
          {
            id: 10,
            name: 'Deadlifts',
            sets: [
              { id: 30, reps: 6, weight: 245 },
              { id: 31, reps: 6, weight: 245 },
              { id: 32, reps: 6, weight: 245 },
              { id: 33, reps: 6, weight: 245 },
            ],
          },
          {
            id: 11,
            name: 'Lat Pulldown',
            sets: [
              { id: 34, reps: 10, weight: 120 },
              { id: 35, reps: 10, weight: 120 },
              { id: 36, reps: 10, weight: 120 },
            ],
          },
          {
            id: 12,
            name: 'Barbell Rows',
            sets: [
              { id: 37, reps: 8, weight: 155 },
              { id: 38, reps: 8, weight: 155 },
              { id: 39, reps: 8, weight: 155 },
            ],
          },
        ],
        date: '2023-10-25',
      },
      {
        userId: 2,
        name: 'Yoga & Mobility',
        exercises: [
          {
            id: 13,
            name: 'Downward Dog',
            sets: [
              { id: 40, duration: '30 sec' },
              { id: 41, duration: '30 sec' },
              { id: 42, duration: '30 sec' },
            ],
          },
          {
            id: 14,
            name: 'Pigeon Pose',
            sets: [
              { id: 43, duration: '45 sec' },
              { id: 44, duration: '45 sec' },
            ],
          },
          {
            id: 15,
            name: 'Hip Mobility Stretch',
            sets: [
              { id: 45, duration: '60 sec' },
              { id: 46, duration: '60 sec' },
              { id: 47, duration: '60 sec' },
            ],
          },
        ],
        date: '2023-11-01',
      },
      {
        userId: 1,
        name: 'Core & Abs',
        exercises: [
          {
            id: 16,
            name: 'Crunches',
            sets: [
              { id: 48, reps: 20 },
              { id: 49, reps: 20 },
              { id: 50, reps: 20 },
            ],
          },
          {
            id: 17,
            name: 'Leg Raises',
            sets: [
              { id: 51, reps: 15 },
              { id: 52, reps: 15 },
              { id: 53, reps: 15 },
            ],
          },
          {
            id: 18,
            name: 'Russian Twists',
            sets: [
              { id: 54, reps: 30, weight: 20 },
              { id: 55, reps: 30, weight: 20 },
              { id: 56, reps: 30, weight: 20 },
            ],
          },
        ],
        date: '2023-11-05',
      },
    ];

    await Workout.bulkCreate(workouts);
    console.log('Users and workouts have been added successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

const resetDB = async () => {
  try {
    await sequelize.authenticate();
    await Workout.drop();
    await User.drop();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Run the function to add workouts
resetDB();
//setTimeout(() => {
//  addWorkouts();
//}, 6000);
