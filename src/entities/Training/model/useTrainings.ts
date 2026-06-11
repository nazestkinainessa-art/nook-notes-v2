import { useState, useEffect } from "react";
import type { TrainingTemplate, ScheduledWorkout } from "./types";

export function useTrainings() {
  const [templates, setTemplates] = useState<TrainingTemplate[]>(() => {
    const savedTemplates = localStorage.getItem("training_templates");
    
    if (savedTemplates) {
      return JSON.parse(savedTemplates);
    }
    
    return [];
  });

  const [schedules, setSchedules] = useState<ScheduledWorkout[]>(() => {
    const savedSchedules = localStorage.getItem("training_schedules");
    
    if (savedSchedules) {
      return JSON.parse(savedSchedules);
    }
    
    return [];
  });

  useEffect(() => {
    localStorage.setItem("training_templates", JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem("training_schedules", JSON.stringify(schedules));
  }, [schedules]);

  const saveTemplate = (newTemplate: TrainingTemplate) => {
    setTemplates((currentTemplates) => {

      const isAlreadyExists = currentTemplates.some(
        (template) => template.id === newTemplate.id
      );

      if (isAlreadyExists) {
        return currentTemplates.map((template) => 
          template.id === newTemplate.id ? newTemplate : template
        );
      }
      
      return [...currentTemplates, newTemplate];
    });
  };

  const deleteTemplate = (idToDelete: number) => {
    setTemplates((currentTemplates) => 
      currentTemplates.filter((template) => template.id !== idToDelete)
    );
    
    setSchedules((currentSchedules) => 
      currentSchedules.filter((schedule) => schedule.templateId !== idToDelete)
    );
  };

  const addSchedule = (newScheduleData: Omit<ScheduledWorkout, "id">) => {
    setSchedules((currentSchedules) => [
      ...currentSchedules,
      {
        id: Date.now(), 
        ...newScheduleData,
      },
    ]);
  };

  const deleteSchedule = (idToDelete: number) => {
    setSchedules((currentSchedules) => 
      currentSchedules.filter((schedule) => schedule.id !== idToDelete)
    );
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