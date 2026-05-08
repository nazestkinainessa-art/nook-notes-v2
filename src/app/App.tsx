import { Button } from "../shared/ui/Button/Button";
import { Calendar } from "../widgets/Calendar";
import { NotesPage } from "../pages/NotesPage/NotesPage"
import { Routes, Route, useNavigate } from "react-router-dom";
/* import { MdClose } from "react-icons/md";*/

export function App() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="flex justify-between items-center px-6 py-4 bg-[#dbd1c7] w-full">
        <h1 className="logo-font">Nook Notes</h1>
        <nav className="flex list-none gap-5 mr-7.5">
          <ul className="flex list-none gap-5 ml-0">
            <li>
              <Button size="md" onClick={() => navigate("/")}>Календарь</Button>
            </li>
            <li>
              <Button size="md" onClick={() => navigate("/notes")}>Заметки</Button>
            </li>
            <li>
              <Button size="md">Тренировки</Button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </main>
      </div>
  );
}
