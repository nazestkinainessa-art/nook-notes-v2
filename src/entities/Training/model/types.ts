export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
}

export interface DayWorkout {
  workoutName: string;
  time: string;
  exercises: Exercise[];
}

export interface TrainingTemplate {
  id: number;
  title: string;
  days: {
    monday: DayWorkout;
    tuesday: DayWorkout;
    wednesday: DayWorkout;
    thursday: DayWorkout;
    friday: DayWorkout;
    saturday: DayWorkout;
    sunday: DayWorkout;
  };
}

export interface ScheduledWorkout {
  id: number;
  templateId: number;
  startDate: string;
  weeksCount: number;
}