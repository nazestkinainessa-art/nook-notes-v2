import { getCalendarData } from "../lib/getCalendarData";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from "../../../shared/ui/Button/Button";
import { Card } from "./card/CalendarGrid";
import ReactMarkdown from "react-markdown";
interface Note {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
}

interface TrainingTemplate {
  id: number;
  title: string;
  days: Record<string, { workoutName: string; exercises: Exercise[] }>;
}

interface TrainingSchedule {
  id: number;
  templateId: number;
  startDate: string;
  weeksCount: number;
}

export function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { daysArray, startsFrom, daysInMonth } = getCalendarData(year, month);
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const today = new Date();
  const [activeTab, setActiveTab] = useState("month");
  const notes: Note[] = JSON.parse(localStorage.getItem("my_notes") || "[]");
  const templates: TrainingTemplate[] = JSON.parse(localStorage.getItem("training_templates") || "[]");
  const schedules: TrainingSchedule[] = JSON.parse(localStorage.getItem("training_schedules") || "[]");
  const getSelectedDayEvents = () => {
    if (!selectedDay) return { dayNotes: [], dayTrainings: [] };
    const pad = (num: number) => String(num).padStart(2, "0");
    const currentDayStr = `${year}-${pad(month + 1)}-${pad(selectedDay)}`;
    const dayNotes = notes.filter((note) => note.date === currentDayStr);
    const targetDate = new Date(year, month, selectedDay);
    const dayNamesEng = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = dayNamesEng[targetDate.getDay()];
    const dayTrainings: { workoutName: string; templateTitle: string; exercises: Exercise[] }[] = [];

    schedules.forEach((sched) => {
      const start = new Date(sched.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start.getTime() + sched.weeksCount * 7 * 24 * 60 * 60 * 1000);
      end.setHours(23, 59, 59, 999);

      if (targetDate >= start && targetDate <= end) {
        const template = templates.find((t) => t.id === sched.templateId);
        if (template?.days?.[dayName]) {
          const dayData = template.days[dayName];
          if (dayData.workoutName?.trim() !== "" || dayData.exercises?.length > 0) {
            dayTrainings.push({
              workoutName: dayData.workoutName || "Workout",
              templateTitle: template.title,
              exercises: dayData.exercises || []
            });
          }
        }
      }
    });

    return { dayNotes, dayTrainings };
  };

  const { dayNotes, dayTrainings } = getSelectedDayEvents();

  const changeMonth = (offset: number) => {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setMonth(newMonth);
    setYear(newYear);
  };

  const handleToday = () => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setSelectedDay(null); 
    setActiveTab("month");
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-5 w-full box-border pb-12">
      <div className="flex justify-between items-center mt-10 mb-5">
        <h1 className="text-xl font-bold text-[#4a3f35]">
          {activeTab === "month" ? `${monthNames[month]} ${year}` : `${year}`}
        </h1>
        <div className="flex gap-2">
          <Button variant={activeTab === "month" ? "tab" : "default"} onClick={() => setActiveTab("month")}>
            Month
          </Button>
          <Button variant={activeTab === "year" ? "tab" : "default"} onClick={() => setActiveTab("year")}>
            Year
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => activeTab === "month" ? changeMonth(-1) : setYear(year - 1)} className="p-2 text-[#755d48] hover:bg-[#e8dfd5] rounded-xl transition-colors">
            <FaAngleLeft />
          </button>
          <Button variant="default" onClick={handleToday}>
            today
          </Button>
          <button onClick={() => activeTab === "month" ? changeMonth(1) : setYear(year + 1)} className="p-2 text-[#755d48] hover:bg-[#e8dfd5] rounded-xl transition-colors">
            <FaAngleRight />
          </button>
        </div>
      </div>
      {activeTab === "month" ? (
        <>
          <div className="grid grid-cols-7 mb-2.5">
            {weekDays.map((name) => (
              <div key={name} className="flex items-center justify-center h-7.5 font-bold text-xs tracking-widest text-[#755d48]">
                {name}
              </div>
            ))}
          </div>
          <Card
            daysArray={daysArray}
            startsFrom={startsFrom}
            daysInMonth={daysInMonth}
            today={today}
            month={month}
            year={year}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {monthNames.map((name, idx) => (
            <div
              key={name}
              onClick={() => {
                setMonth(idx);
                setActiveTab("month");
              }}
              className="bg-[#fdfbf7] border border-[#e8dfd5] rounded-3xl p-6 text-center cursor-pointer hover:bg-[#fbf7ee] hover:border-[#c4a484] hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-[#4a3f35] text-lg group-hover:text-[#755d48] transition-colors">{name}</h3>
            </div>
          ))}
        </div>
      )}
      {selectedDay && activeTab === "month" && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a3f35]/20 backdrop-blur-sm p-4" 
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="relative bg-[#fdfbf7] rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-[#e8dfd5] flex flex-col gap-6 max-h-[85vh]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-[#e8dfd5] pb-4">
              <h2 className="text-xl font-bold text-[#4a3f35] flex items-center gap-2">
                <span className="text-2xl">📅</span> {selectedDay} {monthNames[month]} {year}
              </h2>
              <button 
                onClick={() => setSelectedDay(null)} 
                className="w-8 h-8 rounded-full bg-[#f5f1e6] flex items-center justify-center text-[#755d48] hover:bg-[#e8dfd5] transition-colors text-lg font-bold"
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto pr-2 flex flex-col gap-8 custom-scrollbar">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-[#c4a484] uppercase tracking-widest bg-[#f5f1e6] w-fit px-3 py-1 rounded-lg">Заметки</h3>
                {dayNotes.length === 0 ? (
                  <p className="text-sm text-[#755d48] opacity-60 italic pl-1">Заметок не найдено</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {dayNotes.map((note) => (
                      <div key={note.id} className="bg-white border border-[#e8dfd5] p-5 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-lg text-[#4a3f35]">{note.title}</h4>
                        {note.content && (
                          <div className="text-[#755d48] text-sm leading-relaxed bg-[#fdfbf7] p-4 rounded-xl border border-[#f5f1e6] [&_h1]:text-base [&_h1]:font-bold [&_strong]:font-bold [&_ul]:list-disc [&_ul]:ml-4">
                            <ReactMarkdown>{note.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-[#c4a484] uppercase tracking-widest bg-[#fff1da] w-fit px-3 py-1 rounded-lg">Тренировки</h3>
                {dayTrainings.length === 0 ? (
                  <p className="text-sm text-[#755d48] opacity-60 italic pl-1">Тренировок не запланировано</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {dayTrainings.map((t, idx) => (
                      <div key={idx} className="bg-white border border-[#ffe0b2] p-5 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg text-[#4a3f35] flex items-center gap-2">
                          <span className="bg-[#fff1da] p-2 rounded-xl text-xl">⚡</span> 
                          <div className="flex flex-col">
                            <span>{t.workoutName}</span>
                            <span className="text-xs font-normal text-[#c4a484]">{t.templateTitle}</span>
                          </div>
                        </div>
                        
                        {t.exercises?.length > 0 ? (
                          <div className="flex flex-col gap-2 bg-[#fdfbf7] border border-[#f5f1e6] p-3 rounded-xl">
                            {t.exercises.map((ex) => (
                              <div key={ex.id} className="text-sm text-[#755d48] flex justify-between items-center border-b border-[#e8dfd5] pb-2 last:border-none last:pb-0">
                                <span className="font-bold text-[#4a3f35]">{ex.name}</span>
                                <span className="font-mono text-xs bg-white px-2 py-1 rounded-md text-[#c4a484] border border-[#e8dfd5]">
                                  {ex.sets} x {ex.reps}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[#755d48] italic opacity-60">Упражнения не добавлены</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}