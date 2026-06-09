import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { TemplateModal } from "../../../features/manage-template/ui/TemplateModal";
import { ScheduleModal } from "../../../features/schedule-workout/ui/ScheduleModal";
import { TrainingCard } from "../../../entities/Training/ui/TrainingCard";
import { ScheduleCard } from "../../../entities/Training/ui/ScheduleCard";
import { useTrainings } from "../../../entities/Training/model/useTrainings";
import { formatScheduleDate } from "../../../shared/lib/date";
import type { TrainingTemplate } from "../../../entities/Training/model/types";

export function TrainingsPage() {
  const {
    templates,
    schedules,
    saveTemplate,
    deleteTemplate,
    addSchedule,
    deleteSchedule,
  } = useTrainings();
  
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TrainingTemplate | null>(null);
  
  const isScheduleDisabled = templates.length === 0;
  
  const handleEditClick = (template: TrainingTemplate) => {
    setEditingTemplate(template);
    setIsTemplateModalOpen(true);
  };
  
  const getTemplateTitle = (templateId: number) => {
    return templates.find((template) => template.id === templateId)?.title || "Удаленный шаблон";
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 w-full flex flex-col gap-6">
      <div className="flex gap-4 mt-10">
        <Button
          variant="create"
          size="lg"
          onClick={() => {
            setEditingTemplate(null);
            setIsTemplateModalOpen(true);
          }}
        >
          + Шаблон недели
        </Button>
        <Button
          variant="cancel"
          size="lg"
          disabled={isScheduleDisabled}
          onClick={() => setIsScheduleModalOpen(true)}
          className={`flex items-center gap-2 ${isScheduleDisabled ? "opacity-40 cursor-not-allowed bg-[#e8dfd5] text-[#755d48]/50 border-none" : ""}`}
        >
          Запланировать
        </Button>
      </div>

      {schedules.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-[#755d48] font-bold uppercase tracking-wider text-xs">
            Активные планы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                templateTitle={getTemplateTitle(schedule.templateId)}
                formattedDate={formatScheduleDate(schedule.startDate)}
                onDelete={deleteSchedule}
              />
            ))}
          </div>
        </div>
      )}

      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center gap-4">
          <p className="text-[#755d48] text-xl font-medium opacity-60">
            Нет шаблонов. Создайте первый!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-[#755d48] font-bold uppercase tracking-wider text-xs">
            Шаблоны ({templates.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {templates.map((template) => (
              <TrainingCard
                key={template.id}
                template={template}
                onDelete={deleteTemplate}
                onEdit={handleEditClick}
              />
            ))}
          </div>
        </div>
      )}

      {isTemplateModalOpen && (
        <TemplateModal
          editData={editingTemplate}
          onClose={() => {
            setIsTemplateModalOpen(false);
            setEditingTemplate(null);
          }}
          onSave={saveTemplate}
        />
      )}
      
      {isScheduleModalOpen && (
        <ScheduleModal
          templates={templates}
          onClose={() => setIsScheduleModalOpen(false)}
          onSave={addSchedule}
        />
      )}
    </div>
  );
}