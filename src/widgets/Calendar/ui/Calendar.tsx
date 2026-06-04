import { getCalendarData } from "../lib/getCalendarData";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from "../../../shared/ui/Button/Button";
import { Card } from "./card/CalendarGrid";
import { weekDays, monthNames } from "../lib/constants";
import { useCalendarEvents } from "../lib/useCalendarEvents";
import { DayDetailsModal } from "./DayDetailsModal";

export function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { daysArray, startsFrom, daysInMonth } = getCalendarData(year, month);
  const today = new Date();
  const [activeTab, setActiveTab] = useState("month");
  const changeMonth = (offset: number) => {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
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

  const { dayNotes, dayTrainings } = useCalendarEvents(
    year,
    month,
    selectedDay,
  );

  return (
    <div>
      <div className="flex justify-between items-center mt-10 mb-5">
        <h1 className="text-xl font-bold text-[#4a3f35]">
          {activeTab === "month" ? `${monthNames[month]} ${year}` : `${year}`}
        </h1>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "month" ? "tab" : "default"}
            onClick={() => setActiveTab("month")}
          >
            Month
          </Button>
          <Button
            variant={activeTab === "year" ? "tab" : "default"}
            onClick={() => setActiveTab("year")}
          >
            Year
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              activeTab === "month" ? changeMonth(-1) : setYear(year - 1)
            }
            className="p-2 rounded-xl"
          >
            <FaAngleLeft />
          </Button>
          <Button variant="default" onClick={handleToday}>
            today
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              activeTab === "month" ? changeMonth(1) : setYear(year + 1)
            }
            className="p-2 rounded-xl"
          >
            <FaAngleRight />
          </Button>
        </div>
      </div>
      {activeTab === "month" ? (
        <>
          <div className="grid grid-cols-7 mb-2.5">
            {weekDays.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-7.5 font-bold text-xs tracking-widest text-[#755d48]"
              >
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
              <h3 className="font-bold text-[#4a3f35] text-lg group-hover:text-[#755d48] transition-colors">
                {name}
              </h3>
            </div>
          ))}
        </div>
      )}
      {selectedDay && activeTab === "month" && (
        <DayDetailsModal
        selectedDay={selectedDay}
        monthName={monthNames[month]}
        year={year}
        dayNotes={dayNotes}
        dayTrainings={dayTrainings}
        onClose={() => setSelectedDay(null)}
        />
        )}
    </div>
  );
}
