import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import type {
  Exercise,
  TrainingTemplate,
} from "../../../entities/Training/model/types";
import {
  DAYS_TRANSLATION,
  initialDayState,
} from "../../../entities/Training/model/constants";
import { DayOfWeek } from "./DayOfWeek";

interface TemplateModalProps {
  onClose: () => void;
  onSave: (template: TrainingTemplate) => void;
  editData?: TrainingTemplate | null;
}

type DaysState = TrainingTemplate["days"];

export function TemplateModal({
  onClose,
  onSave,
  editData,
}: TemplateModalProps) {
  const [templateTitle, setTemplateTitle] = useState(editData?.title || "");
  const [days, setDays] = useState<DaysState>(() => {
    if (editData?.days) return editData.days;
    const emptyWeekPairs = DAYS_TRANSLATION.map((day) => [
      day.key,
      { ...initialDayState, exercises: [] },
    ]);
    return Object.fromEntries(emptyWeekPairs) as DaysState;
  });

  const handleDayChange = (
    dayKey: keyof DaysState,
    field: "workoutName" | "time",
    value: string,
  ) => {
    setDays((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value,
      },
    }));
  };

  const handleAddExercise = (dayKey: keyof DaysState) => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: "",
      sets: "",
      reps: "",
    };

    setDays((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        exercises: [...prev[dayKey].exercises, newExercise],
      },
    }));
  };

  const handleExerciseChange = (
    dayKey: keyof DaysState,
    exerciseId: string,
    field: keyof Omit<Exercise, "id">,
    value: string,
  ) => {
    setDays((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        exercises: prev[dayKey].exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, [field]: value } : ex,
        ),
      },
    }))
  };

  const handleRemoveExercise = (
    dayKey: keyof DaysState,
    exerciseId: string,
  ) => {
    setDays((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        exercises: prev[dayKey].exercises.filter((ex) => ex.id !== exerciseId),
      },
    }));
  };

  const handleCreate = () => {
    if (!templateTitle.trim()) return alert("Введите название шаблона!");
    onSave({
      id: editData ? editData.id : Date.now(),
      title: templateTitle,
      days,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="icon"
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </Button>
        <h2 className="text-xl font-bold text-[#4a3f35]">
          {editData ? "Редактировать шаблон" : "Новый шаблон недели"}
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#755d48]">
            Название шаблона *
          </label>
          <input
            type="text"
            placeholder="Например: Силовая программа А"
            value={templateTitle}
            onChange={(e) => setTemplateTitle(e.target.value)}
            className="h-12 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none focus:border-[#755d48]"
          />
        </div>
        <hr className="border-[#e8dfd5]" />

        <div className="flex flex-col gap-6">
          {DAYS_TRANSLATION.map((day) => {
            const dayKey = day.key;
            const dayData = days[dayKey];
            return (
              <DayOfWeek
                key={day.key}
                dayKey={dayKey}
                label={day.label}
                dayData={dayData}
                onDayChange={handleDayChange}
                onAddExercise={handleAddExercise}
                onExerciseChange={handleExerciseChange}
                onRemoveExercise={handleRemoveExercise}
              />
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#e8dfd5]">
          <Button variant="cancel" size="md" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="create" size="md" onClick={handleCreate}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
