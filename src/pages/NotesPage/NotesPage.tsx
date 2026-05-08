import { Button } from "../../shared/ui/Button/Button";
import { NoteCard } from "../../entities/Note/ui/NoteCard";
import { useState } from "react";
import { NoteModal } from "../../features/note-create/ui/NoteModal";

export function NotesPage() {
  const [modalInfoIsOpen, setmodalInfoIsOpen] = useState(false);
  return (
    <>
      <section className="max-w-screen-2xl mx-auto px-5 w-full">
        <div className="flex justify-between items-center mt-10 gap-4">
          <input
            type="text"
            placeholder="Поиск заметок..."
            className="flex-1 h-12 px-4 rounded-xl bg-[#f5f1e6] border border-[#e8dfd5] outline-none focus:border-[#755d48] transition-colors"
          />
          <Button
            variant="create"
            size="lg"
            className="flex items-center gap-1"
            onClick={() => setmodalInfoIsOpen(true)}
          >
            + Заметка
          </Button>
        </div>
        <div className="mt-8">
          <h2 className="text-[#755d48] font-bold mb-4">С ДАТОЙ</h2>
        </div>
        <NoteCard></NoteCard>
      </section>
      <NoteModal
        isOpen={modalInfoIsOpen}
        onClose={() => setmodalInfoIsOpen(false)}
      >
        <h1>Новая заметка</h1>
        <p>Заголовок</p>
      </NoteModal>
    </>
  );
}
