import "./Calendar.css";
import { getCalendarData } from "../lib/getCalendarData";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from "../../../shared/ui/Button/Button";

export function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { daysArray, startsFrom, daysInMonth } = getCalendarData(year, month);
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];
  //const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const today = new Date();
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
    setSelectedDay(now.getDate());
  };
  const [activeTab, setActiveTab] = useState("month");

  return (
    <section className="calendar">
      <div className="calendar__nav">
        <h1>
          {monthNames[month]} {year}
        </h1>
        <div className="calendar__nav-option">
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
        <div className="calendar__month-selector">
          <FaAngleLeft className="nav-icon" onClick={() => changeMonth(-1)} />
          <button className="calendar__today-btn" onClick={handleToday}>
            today
          </button>
          <FaAngleRight className="nav-icon" onClick={() => changeMonth(1)} />
        </div>
      </div>
      <div className="calendar__weekdays-header">
        {weekDays.map((name) => (
          <div key={name} className="calendar__weekday">
            {name}
          </div>
        ))}
      </div>
      <div className="calendar__grid">
        {daysArray.map((_, index) => {
          const dayNumber = index - startsFrom + 1;
          const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
          const isToday =
            isValidDay &&
            dayNumber === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          let dayClass = "calendar__day";
          if (isToday) dayClass += " calendar__day--today";
          if (isValidDay && dayNumber === selectedDay)
            dayClass += " calendar__day--selected";
          return (
            <div
              key={index}
              className={dayClass}
              onClick={() => isValidDay && setSelectedDay(dayNumber)}
            >
              {isValidDay ? dayNumber : ""}
            </div>
          );
        })}
      </div>
    </section>
  );
}
