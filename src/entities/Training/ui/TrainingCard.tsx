import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { SlEnergy } from "react-icons/sl";
import type { TrainingTemplate } from "../model/types";

interface TrainingCardProps {
  template: TrainingTemplate;
  onDelete: (id: number) => void;
  onEdit: (template: TrainingTemplate) => void;
}

const DAYS_TRANSLATION = [
  { key: "monday", label: "MONDAY" },
  { key: "tuesday", label: "TUESDAY" },
  { key: "wednesday", label: "WEDNESDAY" },
  { key: "thursday", label: "THURSDAY" },
  { key: "friday", label: "FRIDAY" },
  { key: "saturday", label: "SATURDAY" },
  { key: "sunday", label: "SUNDAY" },
] as const;

export function TrainingCard({ template, onDelete, onEdit }: TrainingCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeDaysCount = Object.values(template.days).filter(
    (day) => day.workoutName.trim() !== "" || day.exercises.length > 0
  ).length;

  return (
    <div className="bg-[#fdfbf7] border border-[#e8dfd5] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#fff1da] rounded-2xl flex items-center justify-center text-[#ffab2d]">
            <SlEnergy size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#4a3f35] leading-tight">{template.title}</h3>
            <p className="text-xs text-[#755d48] opacity-70 mt-0.5">
              {activeDaysCount} дней в неделю
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onEdit(template)} className="p-2 hover:bg-[#f5f1e6] rounded-xl text-[#4a3f35] transition-colors">
            <MdOutlineEdit size={20} />
          </button>
          
          <button type="button" onClick={() => onDelete(template.id)} className="p-2 hover:bg-[#ff848420] rounded-xl text-[#FF8484] transition-colors">
            <RiDeleteBin6Line size={20} />
          </button>

          <button type="button" onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-[#f5f1e6] rounded-xl text-[#4a3f35] transition-colors ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#e8dfd5] pt-4 mt-2 flex flex-col gap-4">
          {DAYS_TRANSLATION.map(({ key, label }) => {
            const dayData = template.days[key];
            if (!dayData.workoutName.trim() && dayData.exercises.length === 0) return null;

            return (
              <div key={key} className="flex flex-col gap-1 pl-2">
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
                    {dayData.exercises.map((ex) => (
                      <li key={ex.id} className="text-xs">
                        <span className="font-medium text-[#4a3f35]">{ex.name || "Упражнение"}</span> 
                        {(ex.sets || ex.reps) && ` — ${ex.sets || 0} подх. по ${ex.reps || 0} повт.`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}