import { Optional } from 'sequelize';
import { sequelize } from './db';
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
interface WorkoutCreationAttributes extends Optional<WorkoutAttributes, 'id'> { }

// Function to add workouts to the database
async function addWorkouts(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await Workout.sync();

    const workouts: WorkoutCreationAttributes[] = [
      {
        name: 'Leg Day',
        exercises: [
          { name: 'Leg Press', sets: 4, reps: 12, weight: 200 },
          { name: 'Hamstring Curls', sets: 3, reps: 12, weight: 100 },
          { name: 'Calf Raises', sets: 3, reps: 15, weight: 90 },
        ],
        date: '2023-10-12',
      },
      {
        name: 'HIIT Circuit',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Kettlebell Swings', sets: 3, reps: 20, weight: 35 },
          { name: 'Mountain Climbers', sets: 3, reps: 30 },
        ],
        date: '2023-10-15',
      },
      {
        name: 'Push Day',
        exercises: [
          { name: 'Overhead Shoulder Press', sets: 4, reps: 8, weight: 95 },
          { name: 'Tricep Dips', sets: 3, reps: 10 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: 60 },
        ],
        date: '2023-10-20',
      },
      {
        name: 'Pull Day',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: 6, weight: 245 },
          { name: 'Lat Pulldown', sets: 3, reps: 10, weight: 120 },
          { name: 'Barbell Rows', sets: 3, reps: 8, weight: 155 },
        ],
        date: '2023-10-25',
      },
      {
        name: 'Yoga & Mobility',
        exercises: [
          { name: 'Downward Dog', sets: 3, reps: 1, duration: '30 sec' },
          { name: 'Pigeon Pose', sets: 2, reps: 1, duration: '45 sec' },
          {
            name: 'Hip Mobility Stretch',
            sets: 3,
            reps: 1,
            duration: '60 sec',
          },
        ],
        date: '2023-11-01',
      },
      {
        name: 'Core & Abs',
        exercises: [
          { name: 'Crunches', sets: 3, reps: 20 },
          { name: 'Leg Raises', sets: 3, reps: 15 },
          { name: 'Russian Twists', sets: 3, reps: 30, weight: 20 },
        ],
        date: '2023-11-05',
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

const resetDB = async () => {
  try {
    await sequelize.authenticate();
    await Workout.drop()
  } catch(error) {
    console.error('Unable to connect to the database:', error);
  } 
}

// Run the function to add workouts
resetDB()
setTimeout(() => {
  addWorkouts();
}, 6000);
