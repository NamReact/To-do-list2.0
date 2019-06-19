import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./index.css";

import { DashboardContext } from "../../pages/Dashboard";

const Calendar = () => {
  const myContext = useContext(DashboardContext);

  const date = moment();
  const firstDay = moment(date)
    .startOf("month")
    .format("d");
  const weekdays = moment.weekdaysShort();
  const daysInMonth = moment().daysInMonth();

  const monthCalendar = [];
  let dayOfWeek = Number(firstDay);
  let dayOfMonth = 0;

  for (let i = 0; i < daysInMonth; i++) {
    dayOfMonth++;

    monthCalendar.push({
      day: weekdays[dayOfWeek],
      date: dayOfMonth
    });
    if (dayOfWeek === 6) {
      dayOfWeek = 0;
    } else {
      dayOfWeek++;
    }
  }

  const today = String(new Date())
    .split(" ")
    .splice(0, 3)
    .join("");

  let indexOfToday = 0;
  const month = date.format("MMM");

  for (let j = 0; j < monthCalendar.length; j++) {
    if (
      today ===
      monthCalendar[j].day + month + String(monthCalendar[j].date)
    ) {
      indexOfToday = j;
      break;
    }
  }

  const [week, setWeek] = useState(indexOfToday - 3);
  const [until, setUntil] = useState(indexOfToday + 4);
  const [calendar] = useState(monthCalendar);

  const displayCalendar = calendar.slice(week, until).map(({ day, date }) => {
    return (
      <Link
        to={"/dashboard/todolist/" + day + month + date}
        className={
          myContext.state.selectedDate === day + month + date
            ? "calendar-date-container calendar-selected"
            : "calendar-date-container"
        }
        key={date}
        id={day + month + date}
        onClick={e => {
          myContext.setState({ selectedDate: e.currentTarget.id });
        }}
      >
        <div>{day}</div>
        <div className="calendar-date-number">{date}</div>
      </Link>
    );
  });

  const didRunCalendar = useRef(false);

  useEffect(() => {
    if (!didRunCalendar.current) {
      myContext.setState({ selectedDate: today });
      didRunCalendar.current = true;
    }
  });

  return (
    <div className="calendar-container">
      <div
        onClick={
          week > 0
            ? () => {
                if (week < 6) {
                  setWeek(0);
                } else {
                  setWeek(week - 6);
                }
                if (until < 14) {
                  setUntil(7);
                } else {
                  setUntil(until - 6);
                }
              }
            : null
        }
        className="calendar-arrow-container"
      >
        <i className="fas fa-chevron-left" />
      </div>
      <div className="calendar-display">{displayCalendar}</div>
      <div
        onClick={() => {
          if (calendar.length - week <= week) {
            setWeek(calendar.length - 7);
          } else {
            setWeek(week + 6);
          }
          if (calendar.length - until <= 7) {
            setUntil(calendar.length);
          } else {
            setUntil(until + 6);
          }
        }}
        className="calendar-arrow-container"
      >
        <i className="fas fa-chevron-right" />
      </div>
    </div>
  );
};

export default Calendar;
