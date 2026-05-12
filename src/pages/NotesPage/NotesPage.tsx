import { useState } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { NoteCard } from "../../entities/Note/ui/NoteCard";
import { NoteModal } from "../../features/note-create/ui/NoteModal";
import { useEffect } from "react";

interface Note {
  id: number;
  title: string;
  date: string;
  content: string;
}

export function NotesPage() {
  const [modalInfoIsOpen, setmodalInfoIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("my_notes");
    return saved ? JSON.parse(saved) : [];
  });
  const addNote = (newNote: Note) => {
    setNotes([...notes, newNote]);
  };
  const datedNotes = notes.filter((n) => n.date !== "");
  const globalNotes = notes.filter((n) => n.date === "");

  useEffect(() => {
    localStorage.setItem("my_notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 w-full">
      <div className="flex justify-between items-center mt-10 gap-4">
        <input
          type="text"
          placeholder="Поиск заметок..."
          className="flex-1 h-12 px-4 rounded-xl bg-[#f5f1e6] border border-[#e8dfd5] outline-none focus:border-[#755d48] transition-colors"
        />
        <Button
          variant="create"
          size="lg"
          onClick={() => setmodalInfoIsOpen(true)}
        >
          + Заметка
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <p className="text-[#755d48] text-xl font-medium opacity-60">
            Нет заметок. Создайте первую!
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-10">
          {datedNotes.length > 0 && (
            <div>
              <h2 className="text-[#755d48] font-bold mb-4 uppercase tracking-wider text-sm">
                С датой
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {datedNotes.map((n) => (
                  <NoteCard
                    key={n.id}
                    title={n.title}
                    date={n.date}
                    description={n.content}
                  />
                ))}
              </div>
            </div>
          )}

          {globalNotes.length > 0 && (
            <div>
              <h2 className="text-[#755d48] font-bold mb-4 uppercase tracking-wider text-sm">
                Глобальные
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {globalNotes.map((n) => (
                  <NoteCard
                    key={n.id}
                    title={n.title}
                    description={n.content}
                    isGlobal
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <NoteModal
        isOpen={modalInfoIsOpen}
        onClose={() => setmodalInfoIsOpen(false)}
        onAddNote={addNote}
      />
    </div>
  );
}
