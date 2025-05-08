import React from "react";
import './calendar.css'

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ year }) => {
  const renderMonth = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const lastDate = new Date(year, monthIndex + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let day = 1; day <= lastDate; day++) {
      days.push(<div key={day}>{day}</div>);
    }

    return (
      <div className="month" key={monthIndex}>
        <h3>{months[monthIndex]}</h3>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>
        <div className="days">{days}</div>
      </div>
    );
  };

  return (
    <div className="calendar">
      <h1>Calendar - {year}</h1>
      <div className="months">
        {months.map((_, idx) => renderMonth(idx))}
      </div>
    </div>
  );
};

export default Calendar;
