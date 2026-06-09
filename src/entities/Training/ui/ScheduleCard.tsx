import { Button } from "../../../shared/ui/Button/Button";
import { SlEnergy } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { ScheduledWorkout } from "../model/types";

interface ScheduleCardProps {
  schedule: ScheduledWorkout;
  templateTitle: string;
  formattedDate: string;
  onDelete: (id: number) => void;
}

export function ScheduleCard({ schedule, templateTitle, formattedDate, onDelete }: ScheduleCardProps) {
  return (
    <div className="bg-[#fdfbf7] border border-[#e8dfd5] rounded-3xl p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#fff1da] rounded-xl flex items-center justify-center text-[#ffab2d]">
          <SlEnergy size={20} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#4a3f35] leading-snug">
            {templateTitle}
          </h3>
          <p className="text-xs text-[#755d48] opacity-70">
            {formattedDate} · {schedule.weeksCount} нед.
          </p>
        </div>
      </div>
      
      {/* Здесь мы исправили замечание наставника! */}
      <Button
        variant="icon"
        onClick={() => onDelete(schedule.id)}
        className="p-2 hover:bg-[#ff848420] rounded-xl text-[#FF8484] transition-colors"
      >
        <RiDeleteBin6Line size={18} />
      </Button>
    </div>
  );
}