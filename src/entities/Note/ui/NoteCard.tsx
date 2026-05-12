import ReactMarkdown from "react-markdown";

interface NoteCardProps {
  title: string;
  description: string;
  date?: string;
  isGlobal?: boolean;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const NoteCard = ({
  title,
  description,
  date,
  isGlobal,
}: NoteCardProps) => {
  return (
    <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-[#e8dfd5] shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <h3 className="text-xl font-bold text-[#4a3f35]">{title}</h3>

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

      <div className="text-[#755d48] text-sm leading-relaxed line-clamp-3 [&_h1]:text-base [&_h1]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:ml-4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
};
