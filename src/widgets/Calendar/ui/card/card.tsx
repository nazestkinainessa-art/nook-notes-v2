interface CardProps {
  daysArray: number[];
  startsFrom: number;
  daysInMonth: number;
  today: Date;
  month: number;
  year: number;
  selectedDay: number | null;
  setSelectedDay: (day: number) => void;
}

export const Card = ({ 
  daysArray, 
  startsFrom, 
  daysInMonth, 
  today, 
  month, 
  year, 
  selectedDay, 
  setSelectedDay 
}: CardProps) => {
  return (
    <div className="grid grid-cols-7 bg-[#755d48] border border-[#755d48] rounded-xl overflow-hidden gap-px">
      {daysArray.map((_, index) => {
        const dayNumber = index - startsFrom + 1;
        const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
        
        const isToday =
          isValidDay &&
          dayNumber === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();
          
          const dayClass = `
          flex items-center justify-center h-20
          ${isToday ? 'bg-[#f0ad4e] text-white' : 'bg-[#f5f1e6]'}
          ${isValidDay && dayNumber === selectedDay ? 'bg-blue-500 text-white' : ''}
          `;

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
  );
};