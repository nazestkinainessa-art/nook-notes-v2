import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import type { TrainingTemplate } from "../../../entities/Training/model/types";

interface ScheduleModalProps {
  templates: TrainingTemplate[];
  onClose: () => void;
  onSave: (schedule: { templateId: number; startDate: string; weeksCount: number }) => void;
}

export function ScheduleModal({ templates, onClose, onSave }: ScheduleModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || "");
  const [startDate, setStartDate] = useState(() => { const today = new Date(); return today.toISOString().split("T")[0]; });
  const [weeksCount, setWeeksCount] = useState(4);

  const handleApply = () => {
    if (!selectedTemplateId) return alert("Пожалуйста, выберите шаблон!");
    onSave({ templateId: Number(selectedTemplateId), startDate, weeksCount: Number(weeksCount) });
    onClose();
  };

  const handleWeeksInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, '');
    setWeeksCount(onlyNums === '' ? 0 : Number(onlyNums));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-5" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        <h2 className="text-lg font-bold text-[#4a3f35]">Запланировать тренировки</h2>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#755d48]">Шаблон *</label>
          <select value={selectedTemplateId} onChange={(e) => setSelectedTemplateId(e.target.value)} className="h-11 px-3 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] text-sm text-[#4a3f35] outline-none focus:border-[#755d48] cursor-pointer" >
            {templates.map((template) => ( <option key={template.id} value={template.id}>{template.title}</option> ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#755d48]">Начало (понедельник) *</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-11 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] text-sm text-[#4a3f35] outline-none focus:border-[#755d48] cursor-pointer" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#755d48]">Количество недель</label>
          <input type="text" value={weeksCount} onChange={handleWeeksInputChange} className="h-11 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] text-sm text-[#4a3f35] outline-none focus:border-[#755d48]" />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="cancel" size="md" onClick={onClose}>Отмена</Button>
          <Button variant="create" size="md" onClick={handleApply}>Применить</Button>
        </div>
      </div>
    </div>
  );
}