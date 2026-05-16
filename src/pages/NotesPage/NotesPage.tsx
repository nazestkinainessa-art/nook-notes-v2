import { useState, useEffect } from "react";
import { Button } from "../../shared/ui/Button/Button";
import { NoteModal } from "../../features/note-create/ui/NoteModal";
import { NotesList } from "../../widgets/NotesList/ui/NotesList";
import type { Note } from "../../entities/Note/model/types";

export function NotesPage() {
  const [modalInfoIsOpen, setmodalInfoIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("my_notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my_notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (noteData: Note) => {
    const exists = notes.some((n) => n.id === noteData.id);
    setNotes(exists 
      ? notes.map((n) => (n.id === noteData.id ? noteData : n)) 
      : [...notes, noteData]
    );
    setEditingNote(null);
  };

  const handleDelete = (id: number) => setNotes(notes.filter((n) => n.id !== id));

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setmodalInfoIsOpen(true);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 w-full">
      <div className="flex justify-between items-center mt-10 gap-4">
        <input
          type="text"
          placeholder="Поиск заметок..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-12 px-4 rounded-xl bg-[#f5f1e6] border border-[#e8dfd5] outline-none focus:border-[#755d48] transition-colors"
        />
        <Button variant="create" size="lg" onClick={() => { setEditingNote(null); setmodalInfoIsOpen(true); }}>
          + Заметка
        </Button>
      </div>

      <NotesList 
        notes={notes} 
        searchQuery={searchQuery} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {modalInfoIsOpen && (
        <NoteModal 
          editData={editingNote} 
          onClose={() => { setmodalInfoIsOpen(false); setEditingNote(null); }} 
          onAddNote={handleSaveNote} 
        />
      )}
    </div>
  );
}