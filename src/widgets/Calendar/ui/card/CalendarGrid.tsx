import type { Note } from "../../../../entities/Note/model/types";
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
interface TrainingSchedule {
  id: number;
  templateId: number;
  startDate: string;
  weeksCount: number;
}
interface TrainingTemplate {
  id: number;
  title: string;
  days: Record<string, { workoutName: string; exercises: unknown[] }>;
}

export const Card = ({ 
  daysArray, 
  startsFrom, 
  daysInMonth, 
  today, 
  month, 
  year, 
  selectedDay, 
  setSelectedDay 
}: CardProps) => {

  const notes: Note[] = JSON.parse(localStorage.getItem("my_notes") || "[]");
  const templates: TrainingTemplate[] = JSON.parse(localStorage.getItem("training_templates") || "[]");
  const schedules: TrainingSchedule[] = JSON.parse(localStorage.getItem("training_schedules") || "[]");

  const getEventsForDay = (dayNum: number) => {
    const pad = (num: number) => String(num).padStart(2, "0");
    const currentDayStr = `${year}-${pad(month + 1)}-${pad(dayNum)}`;
    const currentNotes = notes.filter((note: Note) => note.date === currentDayStr);
    const targetDate = new Date(year, month, dayNum);
    const dayNamesEng = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = dayNamesEng[targetDate.getDay()];
    const currentTrainings: string[] = [];

    schedules.forEach((sched: TrainingSchedule) => {
      const start = new Date(sched.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start.getTime() + sched.weeksCount * 7 * 24 * 60 * 60 * 1000);
      end.setHours(23, 59, 59, 999);

      if (targetDate >= start && targetDate <= end) {
        const template = templates.find((t: TrainingTemplate) => t.id === sched.templateId);
        if (template?.days?.[dayName]) {
          const dayData = template.days[dayName];
          if (dayData.workoutName?.trim() !== "" || dayData.exercises?.length > 0) {
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
          ${isToday ? 'bg-[#f0ad4e] text-white' : 'bg-[#f5f1e6] text-[#4a3f35]'}
          ${isValidDay && dayNumber === selectedDay ? 'bg-blue-500 text-white' : ''}
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
            <span className="font-bold mb-1">{isValidDay ? dayNumber : ""}</span>
            
            {isValidDay && (
              <div className="flex flex-col text-[10px] truncate w-full text-center pointer-events-none gap-0.5">
                {currentTrainings.map((title, idx) => (
                  <span key={idx} className="font-bold text-[#755d48] bg-[#fff1da] px-1 rounded truncate">{title}</span>
                ))}
                {currentNotes.map((note, idx) => (
                  <span key={idx} className="italic text-[#4a3f35] bg-[#e8dfd5]/60 px-1 rounded truncate">{note.title}</span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};