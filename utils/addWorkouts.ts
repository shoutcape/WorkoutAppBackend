import { Optional } from 'sequelize';
import {sequelize} from './db'
import dotenv from 'dotenv';
import { Workout } from '../models';

dotenv.config();

// Define the attributes for the Workout model
interface WorkoutAttributes {
  id: number;
  name: string;
  exercises: object;
  date: string;
}

// Define the creation attributes for the Workout model
interface WorkoutCreationAttributes extends Optional<WorkoutAttributes, 'id'> {}


// Function to add workouts to the database
async function addWorkouts(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await Workout.sync();

    const workouts: WorkoutCreationAttributes[] = [
      {
        name: 'Morning Cardio',
        exercises: [{ name: 'Running', duration: 30 }],
        date: '2023-10-01',
      },
      {
        name: 'Strength Training',
        exercises: [{ name: 'Bench Press', sets: 4, reps: 10, weight: 135 }],
        date: '2023-10-02',
      },
      {
        name: 'Yoga Session',
        exercises: [{ name: 'Sun Salutation', duration: 20 }],
        date: '2023-10-03',
      },
    ];

    await Workout.bulkCreate(workouts);
    console.log('Workouts have been added successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the function to add workouts
addWorkouts();

