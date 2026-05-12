import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { MdClose } from "react-icons/md";
import ReactMarkdown from "react-markdown";

interface Note {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: Note) => void;
}

export const NoteModal = ({ isOpen, onClose, onAddNote }: NoteModalProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleCreate = () => {
    if (!title.trim()) return alert("Введите заголовок!");

    onAddNote({
      id: Date.now(),
      title,
      date,
      content,
    });

    setTitle("");
    setDate("");
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl p-10 w-full max-w-2xl shadow-2xl flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="icon"
          size="icon"
          className="absolute top-6 right-6 text-gray-400"
          onClick={onClose}
        >
          <MdClose size={24} />
        </Button>

        <h2 className="text-2xl font-bold text-[#4a3f35]">Новая заметка</h2>

        <div className="flex gap-4 w-full items-end">
          <div className="flex-2 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#755d48]">
              Заголовок *
            </label>
            <input
              type="text"
              placeholder="Название заметки..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#755d48]">
              Дата (необязательно)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-[#755d48]">
            Содержимое
          </label>
          <div className="flex bg-[#f5f1e6] p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-6 py-1.5 rounded-lg text-sm transition-all ${activeTab === "edit" ? "bg-white shadow-sm" : "opacity-50"}`}
            >
              Редактор
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-6 py-1.5 rounded-lg text-sm transition-all ${activeTab === "preview" ? "bg-white shadow-sm" : "opacity-50"}`}
            >
              Предпросмотр
            </button>
          </div>

          {activeTab === "edit" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-60 p-5 rounded-2xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none resize-none font-mono text-sm"
              placeholder="# Заголовок заметки..."
            />
          ) : (
            <div
              className="w-full min-h-60 p-5 rounded-2xl bg-[#fdfbf7] border border-[#e8dfd5] overflow-y-auto 
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-[#4a3f35]
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_strong]:font-bold [&_strong]:text-[#755d48]
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:block
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:block [&_li]:mb-1
             text-[#4a3f35]"
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="cancel" size="lg" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="create" size="lg" onClick={handleCreate}>
            Создать
          </Button>
        </div>
      </div>
    </div>
  );
};
