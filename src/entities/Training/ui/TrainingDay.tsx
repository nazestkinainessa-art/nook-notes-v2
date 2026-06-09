import type{ DayWorkout } from "../model/types";


interface TrainingDayProps {
  label: string;
  dayData: DayWorkout;
}

export function TrainingDay({ label, dayData}: TrainingDayProps) {
    return(
        <div
        className="flex flex-col gap-1 pl-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#755d48] tracking-wider">{label}</span> 
                  <span className="text-[#755d48] normal-case">— {dayData.workoutName || "Без названия"}</span>
                  {dayData.time && (
                    <span className="text-gray-500 font-mono text-[10px] bg-white border border-[#e8dfd5] px-1.5 py-0.5 rounded-full shadow-inner">
                      {dayData.time}
                    </span>
                  )}
                </div>
                
                {dayData.exercises.length > 0 && (
                  <ul className="list-disc list-inside pl-3 text-sm text-[#755d48] flex flex-col gap-0.5">
                    {dayData.exercises.map((exercise) => (
                      <li key={exercise.id} className="text-xs">
                        <span className="font-medium text-[#4a3f35]">{exercise.name || "Упражнение"}</span> 
                        {(exercise.sets || exercise.reps) && ` — ${exercise.sets || 0} подх. по ${exercise.reps || 0} повт.`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
    );

}