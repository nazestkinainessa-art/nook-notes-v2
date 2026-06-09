import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { SlEnergy } from "react-icons/sl";
import type { TrainingTemplate } from "../model/types";
import { DAYS_TRANSLATION } from "../model/constants";
import { Button } from "../../../shared/ui/Button/Button";
import { TrainingDay } from "./TrainingDay";

interface TrainingCardProps {
  template: TrainingTemplate;
  onDelete: (id: number) => void;
  onEdit: (template: TrainingTemplate) => void;
}

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
          <Button variant="icon" onClick={() => onEdit(template)} className="p-2 hover:bg-[#f5f1e6] rounded-xl text-[#4a3f35] transition-colors">
            <MdOutlineEdit size={20} />
          </Button>
          
          <Button variant="icon" onClick={() => onDelete(template.id)} className="p-2 hover:bg-[#ff848420] rounded-xl text-[#FF8484] transition-colors">
            <RiDeleteBin6Line size={20} />
          </Button>

          <Button variant="icon" onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-[#f5f1e6] rounded-xl text-[#4a3f35] transition-colors ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#e8dfd5] pt-4 mt-2 flex flex-col gap-4">
          {DAYS_TRANSLATION.map(({ key, label }) => {
            const dayData = template.days[key];
            if (!dayData.workoutName.trim() && dayData.exercises.length === 0) return null;

            return (
              <TrainingDay key={key} label={label} dayData={dayData} />
            );
          })}
        </div>
      )}
    </div>
  );
}