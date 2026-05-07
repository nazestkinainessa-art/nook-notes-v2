import { getCalendarData } from "../lib/getCalendarData";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Button } from "../../../shared/ui/Button/Button";
import { Card } from "./card/card";

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
    <section className="max-w-screen-2xl mx-auto px-5 w-full box-border">
      <div className="flex justify-between items-center mt-10 mb-5">
        <h1>
          {monthNames[month]} {year}
        </h1>
        <div>
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
        <div className="flex items-center justify-right ">
          <FaAngleLeft onClick={() => changeMonth(-1)} />
          <button onClick={handleToday}>
            today
          </button>
          <FaAngleRight onClick={() => changeMonth(1)} />
        </div>
      </div>
      <div className="grid grid-cols-7 mb-2.5">
        {weekDays.map((name) => (
          <div key={name} className="flex items-center justify-center h-7.5 bg-transparent font-semibold text-sm text-[#755d48]">
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
    </section>
  );
}
