import React, { useState, useContext } from 'react';
import { DateContext } from '../contexts/DateContext';
import '../styles/Calendar.css';

interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [showYearSelector, setShowYearSelector] = useState<boolean>(false);

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const { setSelectDate } = useContext(DateContext);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleYearClick = () => {
    setShowYearSelector(true);
  };

  const handleYearSelect = (year: number) => {
    setSelectedDate((prev) => new Date(year, prev.getMonth(), 1));
    setShowYearSelector(false);
  };

  const years: number[] = [];
  for (let year = 1980; year <= new Date().getFullYear(); year++) {
    years.push(year);
  }

  const handleDayClick = (day: number) => {
    setSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  };

  const emptyDays = [...Array(getFirstDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth()))];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2 onClick={handleYearClick}>{`${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()
          }`}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day-header">D</div>
        <div className="calendar-day-header">S</div>
        <div className="calendar-day-header">T</div>
        <div className="calendar-day-header">Q</div>
        <div className="calendar-day-header">Q</div>
        <div className="calendar-day-header">S</div>
        <div className="calendar-day-header">S</div>
        {[...emptyDays, ...Array(getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth()))].map(
          (day, i) => {
            const dayOfMonth = i + 1 - emptyDays.length;
            const isToday =
              dayOfMonth === new Date().getDate() &&
              selectedDate.getMonth() === new Date().getMonth() &&
              selectedDate.getFullYear() === new Date().getFullYear();
            const isSelected =
              dayOfMonth === selectedDate.getDate()

            return (
              <div
                key={i}
                className={`calendar-day ${isToday ? 'calendar-today' : ''} ${isSelected ? 'calendar-selected' : ''
                  }`}
                onClick={() => handleDayClick(dayOfMonth)}
              >
                {dayOfMonth > 0 ? dayOfMonth : ''}
              </div>
            );
          }
        )}
      </div>
      {showYearSelector && (
        <div className="calendar-year-selector">
          {years.map((year, i) => (
            <div key={i} onClick={() => handleYearSelect(year)}>
              {year}
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Calendar;