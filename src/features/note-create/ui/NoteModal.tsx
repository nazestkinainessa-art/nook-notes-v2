import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { MdClose } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import type { Note } from "../../../entities/Note/model/types";



interface NoteModalProps {
  editData: Note | null;
  onClose: () => void;
  onAddNote: (note: Note) => void;
}

export function NoteModal({ editData, onClose, onAddNote }: NoteModalProps) {
  const [title, setTitle] = useState(editData?.title || "");
  const [date, setDate] = useState(editData?.date || "");
  const [content, setContent] = useState(editData?.content || "");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleSave = () => {
    if (!title.trim()) return alert("Введите заголовок!");

    const noteToSave = {
      id: editData ? editData.id : Date.now(),
      title,
      content,
      date,
    };

    onAddNote(noteToSave);
    onClose();
  };

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

        <h2 className="text-2xl font-bold text-[#4a3f35]">
          {editData ? "Редактировать заметку" : "Новая заметка"}
        </h2>

        <div className="flex gap-4 w-full items-end">
          <div className="flex-2 flex flex-col gap-1.5 w-full">
            <label className="text-sm font-semibold text-[#755d48]">Заголовок *</label>
            <input
              type="text"
              placeholder="Название заметки..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none focus:border-[#755d48]"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#755d48]">Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 px-4 rounded-xl bg-[#fdfbf7] border border-[#e8dfd5] outline-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-[#755d48]">Содержимое</label>
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
              placeholder="# Начни писать..."
            />
          ) : (
            <div className="w-full min-h-60 p-5 rounded-2xl bg-[#fdfbf7] border border-[#e8dfd5] overflow-y-auto text-[#4a3f35]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="cancel" size="lg" onClick={onClose}>Отмена</Button>
          <Button variant="create" size="lg" onClick={handleSave}>
            {editData ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </div>
    </div>
  );
}
