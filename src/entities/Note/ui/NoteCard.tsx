import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MdOutlineEdit } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import type { Note } from "../model/types";
import { formatDate } from "../../../shared/lib/date";

interface NoteCardProps extends Note {
  isGlobal?: boolean;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export const NoteCard = ({ title, content, date, isGlobal, id, onDelete, onEdit }: NoteCardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group bg-[#fdfbf7] p-6 rounded-3xl border border-[#e8dfd5] shadow-sm hover:shadow-md transition-all flex flex-col gap-3 relative">
      
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-xl font-bold text-[#4a3f35] leading-tight">{title}</h3>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ActionButton onClick={handleCopy} icon={isCopied ? <FaCheck size={20} /> : <IoCopyOutline size={20} />} />
          <ActionButton onClick={onEdit} icon={<MdOutlineEdit size={20} />} />
          <ActionButton onClick={() => onDelete(id)} icon={<RiDeleteBin6Line size={20} />} variant="danger" />
        </div>
      </div>

      <div className="flex gap-2">
        {date && !isGlobal && (
          <div className="bg-[#c4a484] text-white text-xs px-3 py-1 rounded-full w-fit">
            {formatDate(date)}
          </div>
        )}
        {isGlobal && (
          <div className="flex items-center gap-1 border border-[#e8dfd5] text-[#755d48] text-xs px-3 py-1 rounded-full w-fit bg-white">
            Глобальная
          </div>
        )}
      </div>

      <div className="text-[#755d48] text-sm leading-relaxed line-clamp-3 [&_h1]:text-base [&_h1]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:ml-4">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

const ActionButton = ({ onClick, icon, variant = "default" }: { onClick: () => void; icon: React.ReactNode; variant?: "default" | "danger" }) => (
  <button
    onClick={onClick}
    className={`p-1.5 rounded-lg transition-colors ${
      variant === "danger" ? "hover:bg-[#ff848420] text-[#FF8484]" : "hover:bg-[#f5f1e6] text-[#4a3f35]"
    }`}
  >
    {icon}
  </button>
);