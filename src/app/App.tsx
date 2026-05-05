import { Calendar } from '../widgets/Calendar';

export function App() {
  return (
    <div className="app-wrapper">
    <header className="header">
      <h1 className="logo-font">Nook Notes</h1>
      <nav className="nav-top">
        <ul>
          <li>
            <p>Month</p>
          </li>
          <li>
            <p>Year</p>
          </li>
        </ul>
      </nav>
    </header>
    <nav className="nav-bottom">
      <ul>
        <li>
          <p>Календарь</p>
        </li>
        <li>
          <p>Заметки</p>
        </li>
        <li>
          <p>Напоминания</p>
        </li>
        <li>
          <p>Тренировки</p>
        </li>
      </ul>
    </nav>
    <main className="content">
      <div className="main__container">
        <Calendar></Calendar>
      </div>
    </main>
    </div>
    
  );
}
