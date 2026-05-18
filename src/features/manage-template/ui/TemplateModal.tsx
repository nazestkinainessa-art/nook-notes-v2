import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { DayWorkout, Exercise, TrainingTemplate } from "../../../entities/Training/model/types";

interface TemplateModalProps {
  onClose: () => void;
  onSave: (template: TrainingTemplate) => void;
  editData?: TrainingTemplate | null;
}

const DAYS_OF_WEEK = [
  { key: "monday", label: "MONDAY" },
  { key: "tuesday", label: "TUESDAY" },
  { key: "wednesday", label: "WEDNESDAY" },
  { key: "thursday", label: "THURSDAY" },
  { key: "friday", label: "FRIDAY" },
  { key: "saturday", label: "SATURDAY" },
  { key: "sunday", label: "SUNDAY" },
] as const;

const initialDayState: DayWorkout = {
  workoutName: "",
  time: "",
  exercises: [],
};

type DaysState = TrainingTemplate["days"];

export function TemplateModal({ onClose, onSave, editData }: TemplateModalProps) {
  const [templateTitle, setTemplateTitle] = useState(editData ? editData.title : "");
  const [days, setDays] = useState<DaysState>(editData ? editData.days : { monday: { ...initialDayState, exercises: [] }, tuesday: { ...initialDayState, exercises: [] }, wednesday: { ...initialDayState, exercises: [] }, thursday: { ...initialDayState, exercises: [] }, friday: { ...initialDayState, exercises: [] }, saturday: { ...initialDayState, exercises: [] }, sunday: { ...initialDayState, exercises: [] }});

  const handleDayChange = (dayKey: keyof DaysState, field: "workoutName" | "time", value: string) => {
    setDays((prev) => ({ ...prev, [dayKey]: { ...prev[dayKey], [field]: value } }));
  };

  const handleAddExercise = (dayKey: keyof DaysState) => {
    const newExercise: Exercise = { id: Math.random().toString(36).substring(2, 9), name: "", sets: "", reps: "" };
    setDays((prev) => ({ ...prev, [dayKey]: { ...prev[dayKey], exercises: [...prev[dayKey].exercises, newExercise] } }));
  };

  const handleExerciseChange = (dayKey: keyof DaysState, exerciseId: string, field: keyof Omit<Exercise, "id">, value: string) => {
    setDays((prev) => ({ ...prev, [dayKey]: { ...prev[dayKey], exercises: prev[dayKey].exercises.map((ex) => ex.id === exerciseId ? { ...ex, [field]: value } : ex)}}));
  };

  const handleRemoveExercise = (dayKey: keyof DaysState, exerciseId: string) => {
    setDays((prev) => ({ ...prev, [dayKey]: { ...prev[dayKey], exercises: prev[dayKey].exercises.filter((ex) => ex.id !== exerciseId) } }));
  };

  const handleCreate = () => {
    if (!templateTitle.trim()) return alert("Введите название шаблона!");
    onSave({ id: editData ? editData.id : Date.now(), title: templateTitle, days });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        <h2 className="text-xl font-bold text-[#4a3f35]">{editData ? "Редактировать шаблон" : "Новый шаблон недели"}</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#755d48]">Название шаблона *</label>
          <input type="text" placeholder="Например: Силовая программа А" value={templateTitle} onChange={(e) => setTemplateTitle(e.target.value)} className="h-12 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none focus:border-[#755d48]" />
        </div>
        <hr className="border-[#e8dfd5]" />

        <div className="flex flex-col gap-6">
          {DAYS_OF_WEEK.map((day) => {
            const dayKey = day.key;
            const dayData = days[dayKey];
            return (
              <div key={day.key} className="flex flex-col gap-3 p-4 bg-[#fdfbf7] rounded-2xl border border-[#e8dfd5]/60">
                <h3 className="font-bold text-[#755d48] text-xs tracking-wider">{day.label}</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Название дня (напр. Грудь)" value={dayData.workoutName} onChange={(e) => handleDayChange(dayKey, "workoutName", e.target.value)} className="flex-1 h-11 px-4 rounded-xl bg-white border border-[#e8dfd5] outline-none text-sm focus:border-[#755d48]" />
                  <input type="time" value={dayData.time} onChange={(e) => handleDayChange(dayKey, "time", e.target.value)} className="w-28 h-11 px-3 rounded-xl bg-white border border-[#e8dfd5] outline-none text-sm cursor-pointer focus:border-[#755d48]" />
                </div>

                {dayData.exercises.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1 pl-2 border-l-2 border-[#c4a484]/40">
                    {dayData.exercises.map((ex) => (
                      <div key={ex.id} className="flex gap-2 items-center">
                        <input type="text" placeholder="Упражнение" value={ex.name} onChange={(e) => handleExerciseChange(dayKey, ex.id, "name", e.target.value)} className="flex-1 h-10 px-3 rounded-lg bg-white border border-[#e8dfd5] outline-none text-xs focus:border-[#755d48]" />
                        <input type="text" placeholder="Подх." value={ex.sets} onChange={(e) => handleExerciseChange(dayKey, ex.id, "sets", e.target.value)} className="w-14 h-10 px-2 rounded-lg bg-white border border-[#e8dfd5] outline-none text-xs text-center focus:border-[#755d48]" />
                        <input type="text" placeholder="Повт." value={ex.reps} onChange={(e) => handleExerciseChange(dayKey, ex.id, "reps", e.target.value)} className="w-14 h-10 px-2 rounded-lg bg-white border border-[#e8dfd5] outline-none text-xs text-center focus:border-[#755d48]" />
                        <button type="button" onClick={() => handleRemoveExercise(dayKey, ex.id)} className="p-1.5 hover:bg-[#ff848420] rounded-lg text-[#FF8484]"><RiDeleteBin6Line size={20} /></button>
                      </div>
                    ))}
                  </div>
                )}
                <button type="button" onClick={() => handleAddExercise(dayKey)} className="text-left text-xs font-semibold text-[#755d48] hover:text-[#4a3f35] w-fit mt-1">+ Упражнение</button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#e8dfd5]">
          <Button variant="cancel" size="md" onClick={onClose}>Отмена</Button>
          <Button variant="create" size="md" onClick={handleCreate}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
}