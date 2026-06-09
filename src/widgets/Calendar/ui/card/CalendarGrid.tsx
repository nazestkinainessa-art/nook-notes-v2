import type { Note } from "../../../../entities/Note/model/types";
import type {
  ScheduledWorkout,
  TrainingTemplate,
} from "../../../../entities/Training/model/types";
import { dayNamesEng } from "../../lib/constants";
import {pad} from "../../../../shared/lib/utils";
interface CardProps {
  daysArray: null[];
  startsFrom: number;
  daysInMonth: number;
  today: Date;
  month: number;
  year: number;
  selectedDay: number | null;
  setSelectedDay: (day: number) => void;
}

export const Card = ({
  daysArray,
  startsFrom,
  daysInMonth,
  today,
  month,
  year,
  selectedDay,
  setSelectedDay,
}: CardProps) => {
  const notes: Note[] = JSON.parse(localStorage.getItem("my_notes") || "[]");
  const templates: TrainingTemplate[] = JSON.parse(
    localStorage.getItem("training_templates") || "[]",
  );
  const schedules: ScheduledWorkout[] = JSON.parse(
    localStorage.getItem("training_schedules") || "[]",
  );

  const getEventsForDay = (dayNum: number) => {
    const currentDayStr = `${year}-${pad(month + 1)}-${pad(dayNum)}`;
    const currentNotes = notes.filter(
      (note: Note) => note.date === currentDayStr,
    );
    const targetDate = new Date(year, month, dayNum);
    const dayName = dayNamesEng[targetDate.getDay()] as keyof TrainingTemplate["days"];
    const currentTrainings: string[] = [];

    schedules.forEach((schedule: ScheduledWorkout) => {
      const start = new Date(schedule.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(
        start.getTime() + schedule.weeksCount * 7 * 24 * 60 * 60 * 1000,
      );
      end.setHours(23, 59, 59, 999);

      if (targetDate >= start && targetDate <= end) {
        const template = templates.find(
          (template: TrainingTemplate) => template.id === schedule.templateId,
        );
        if (template?.days?.[dayName]) {
          const dayData = template.days[dayName];
          if (
            dayData.workoutName?.trim() !== "" ||
            dayData.exercises?.length > 0
          ) {
            currentTrainings.push(dayData.workoutName || "Workout");
          }
        }
      }
    });

    return { currentNotes, currentTrainings };
  };

  return (
    <div className="grid grid-cols-7 bg-[#755d48] border border-[#755d48] rounded-xl overflow-hidden gap-px">
      {daysArray.map((_, index) => {
        const dayNumber = index - startsFrom + 1;
        const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;

        const isToday =
          isValidDay &&
          dayNumber === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();

        const dayClass = `
          flex flex-col items-center justify-start min-h-20 p-1 text-xs
          ${isToday ? "bg-[#f0ad4e] text-white" : "bg-[#f5f1e6] text-[#4a3f35]"}
          ${isValidDay && dayNumber === selectedDay ? "bg-blue-500 text-white" : ""}
        `;

        const { currentNotes, currentTrainings } = isValidDay
          ? getEventsForDay(dayNumber)
          : { currentNotes: [], currentTrainings: [] };

        return (
          <div
            key={index}
            className={dayClass}
            onClick={() => isValidDay && setSelectedDay(dayNumber)}
          >
            <span className="font-bold mb-1">
              {isValidDay ? dayNumber : ""}
            </span>

            {isValidDay && (
              <div className="flex flex-col text-[10px] truncate w-full text-center pointer-events-none gap-0.5">
                {currentTrainings.map((title, index) => (
                  <span
                    key={index}
                    className="font-bold text-[#755d48] bg-[#fff1da] px-1 rounded truncate"
                  >
                    {title}
                  </span>
                ))}
                {currentNotes.map((note, index) => (
                  <span
                    key={index}
                    className="italic text-[#4a3f35] bg-[#e8dfd5]/60 px-1 rounded truncate"
                  >
                    {note.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
