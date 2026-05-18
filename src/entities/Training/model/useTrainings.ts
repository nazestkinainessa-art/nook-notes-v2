import { useState, useEffect } from "react";
import type { TrainingTemplate, ScheduledWorkout } from "./types";

export function useTrainings() {
  const [templates, setTemplates] = useState<TrainingTemplate[]>(() => {
    const saved = localStorage.getItem("training_templates");
    return saved ? JSON.parse(saved) : [];
  });

  const [schedules, setSchedules] = useState<ScheduledWorkout[]>(() => {
    const saved = localStorage.getItem("training_schedules");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("training_templates", JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem("training_schedules", JSON.stringify(schedules));
  }, [schedules]);

  const saveTemplate = (templateData: TrainingTemplate) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.id === templateData.id);
      if (exists) {
        return prev.map((t) => (t.id === templateData.id ? templateData : t));
      }
      return [...prev, templateData];
    });
  };

  const deleteTemplate = (id: number) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setSchedules((prev) => prev.filter((s) => s.templateId !== id));
  };

  const addSchedule = (scheduleData: Omit<ScheduledWorkout, "id">) => {
    const newSchedule: ScheduledWorkout = {
      id: Date.now(),
      ...scheduleData,
    };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const deleteSchedule = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    templates,
    schedules,
    saveTemplate,
    deleteTemplate,
    addSchedule,
    deleteSchedule,
  };
}