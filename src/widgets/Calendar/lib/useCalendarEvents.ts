import type {Note} from "../../../entities/Note/model/types"
import type {TrainingTemplate, Exercise, ScheduledWorkout} from "../../../entities/Training/model/types"
import { dayNamesEng } from "./constants";

export function useCalendarEvents(year: number, month: number, selectedDay: number | null) {
    const notes: Note[] = JSON.parse(localStorage.getItem("my_notes") || "[]");
    const templates: TrainingTemplate[] = JSON.parse(localStorage.getItem("training_templates") || "[]");
    const schedules: ScheduledWorkout[] = JSON.parse(localStorage.getItem("training_schedules") || "[]");

        if (!selectedDay) return { dayNotes: [], dayTrainings: [] };
        const pad = (num: number) => String(num).padStart(2, "0");
        const currentDayStr = `${year}-${pad(month + 1)}-${pad(selectedDay)}`;
        const dayNotes = notes.filter((note) => note.date === currentDayStr);
        const targetDate = new Date(year, month, selectedDay);
        const dayName = dayNamesEng[targetDate.getDay()] as keyof TrainingTemplate["days"];
        const dayTrainings: { workoutName: string; templateTitle: string; exercises: Exercise[] }[] = [];
    
        schedules.forEach((sched) => {
          const start = new Date(sched.startDate);
          start.setHours(0, 0, 0, 0);
          const end = new Date(start.getTime() + sched.weeksCount * 7 * 24 * 60 * 60 * 1000);
          end.setHours(23, 59, 59, 999);
    
          if (targetDate >= start && targetDate <= end) {
            const template = templates.find((t) => t.id === sched.templateId);
            if (template?.days?.[dayName]) {
              const dayData = template.days[dayName];
              if (dayData.workoutName?.trim() !== "" || dayData.exercises?.length > 0) {
                dayTrainings.push({
                  workoutName: dayData.workoutName || "Workout",
                  templateTitle: template.title,
                  exercises: dayData.exercises || []
                });
              }
            }
          }
        });
    
        return { dayNotes, dayTrainings };
      }

