import { Button } from "../../../shared/ui/Button/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { DayWorkout, Exercise, TrainingTemplate } from "../../../entities/Training/model/types";


type DayKey = keyof TrainingTemplate["days"];


interface DayOfWeekProps {
  dayKey: DayKey;
  label: string;
  dayData: DayWorkout;
  onDayChange: (dayKey: DayKey, field: "workoutName" | "time", value: string) => void;
  onAddExercise: (dayKey: DayKey) => void;
  onExerciseChange: (dayKey: DayKey, exerciseId: string, field: keyof Omit<Exercise, "id">, value: string) => void;
  onRemoveExercise: (dayKey: DayKey, exerciseId: string) => void;
}

export function DayOfWeek({ 
  dayKey, label, dayData, onDayChange, onAddExercise, onExerciseChange, onRemoveExercise 
}: DayOfWeekProps) {

    return (
        <div className="flex flex-col gap-3 p-4 bg-[#fdfbf7] rounded-2xl border border-[#e8dfd5]/60">
                <h3 className="font-bold text-[#755d48] text-xs tracking-wider">{label}</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Название дня (напр. Грудь)" value={dayData.workoutName} onChange={(e) => onDayChange(dayKey, "workoutName", e.target.value)} className="flex-1 h-11 px-4 rounded-xl bg-white border border-[#e8dfd5] outline-none text-sm focus:border-[#755d48]" />
                  <input type="time" value={dayData.time} onChange={(e) => onDayChange(dayKey, "time", e.target.value)} className="w-28 h-11 px-3 rounded-xl bg-white border border-[#e8dfd5] outline-none text-sm cursor-pointer focus:border-[#755d48]" />
                </div>

                {dayData.exercises.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1 pl-2 border-l-2 border-[#c4a484]/40">
                    {dayData.exercises.map((exercise) => (
                      <div key={exercise.id} className="flex gap-2 items-center">
                        <input type="text" placeholder="Упражнение" value={exercise.name} onChange={(e) => onExerciseChange(dayKey, exercise.id, "name", e.target.value)} className="flex-1 h-10 px-3 rounded-lg bg-white border border-[#e8dfd5] outline-none text-xs focus:border-[#755d48]" />
                        <input type="text" placeholder="Подх." value={exercise.sets} onChange={(e) => onExerciseChange(dayKey, exercise.id, "sets", e.target.value)} className="w-14 h-10 px-2 rounded-lg bg-white border border-[#e8dfd5] outline-none text-xs text-center focus:border-[#755d48]" />
                        <input type="text" placeholder="Повт." value={exercise.reps} onChange={(e) => onExerciseChange(dayKey, exercise.id, "reps", e.target.value)} className="w-14 h-10 px-2 rounded-lg bg-white border border-[#e8dfd5] outline-none text-xs text-center focus:border-[#755d48]" />
                        <Button variant="icon"
                        onClick={() => onRemoveExercise(dayKey, exercise.id)} className="p-1.5 hover:bg-[#ff848420] rounded-lg text-[#FF8484]"><RiDeleteBin6Line size={20} /></Button>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="icon"
                 onClick={() => onAddExercise(dayKey)} className="text-left text-xs font-semibold text-[#755d48] hover:text-[#4a3f35] w-fit mt-1">+ Упражнение</Button>
              </div>
    )
}