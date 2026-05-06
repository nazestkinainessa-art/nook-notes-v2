import { Button } from "../shared/ui/Button/Button";
import { Calendar } from "../widgets/Calendar";
import { MdClose } from "react-icons/md";


export function App() {
  return (
    <div className="app-wrapper">
      <header className="header">
        <h1 className="logo-font">Nook Notes</h1>
        <nav className="nav">
          <ul>
            <li>
              <Button size="md">Календарь</Button>
            </li>
            <li>
              <Button size="md">Заметки</Button>
            </li>
            <li>
              <Button size="md">Напоминания</Button>
            </li>
            <li>
              <Button size="md">Тренировки</Button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="content">
        <div className="main__container">
          <Calendar></Calendar>
        </div>
      </main>
      <Button variant={"add"} size="sm">Add</Button>
      <Button variant={"icon"} size="icon">
        <MdClose/>
        </Button>
    </div>
  );
}
