import { NoteCard } from "../../../entities/Note/ui/NoteCard";
import type { Note } from "../../../entities/Note/model/types";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  searchQuery: string;
}

export function NotesList({
  notes,
  onEdit,
  onDelete,
  searchQuery,
}: NotesListProps) {
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const datedNotes = filteredNotes.filter((n) => n.date !== "");
  const globalNotes = filteredNotes.filter((n) => n.date === "");

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-center">
        <p className="text-[#755d48] text-xl font-medium opacity-60">
          Нет заметок. Создайте первую!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-10">
      {datedNotes.length > 0 && (
        <section>
          <h2 className="text-[#755d48] font-bold mb-4 uppercase tracking-wider text-sm">
            С датой
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {datedNotes.map((n) => (
              <NoteCard
                key={n.id}
                {...n}
                onDelete={onDelete}
                onEdit={() => onEdit(n)}
              />
            ))}
          </div>
        </section>
      )}

      {globalNotes.length > 0 && (
        <section>
          <h2 className="text-[#755d48] font-bold mb-4 uppercase tracking-wider text-sm">
            Глобальные
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {globalNotes.map((n) => (
              <NoteCard
                key={n.id}
                {...n}
                isGlobal
                onDelete={onDelete}
                onEdit={() => onEdit(n)}
              />
            ))}
          </div>
        </section>
      )}

      {filteredNotes.length === 0 && searchQuery !== "" && (
        <div className="text-center mt-20 opacity-50">
          Ничего не найдено по запросу "{searchQuery}"
        </div>
      )}
    </div>
  );
}
