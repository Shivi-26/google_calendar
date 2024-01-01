// App.js

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaTrash } from 'react-icons/fa';
import EventCreationPage from './component/EventCreationPage'; // Import the new component
import './style.css';

const App = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.getElementById(moment().month(selectedMonth).format('MMMM')).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [selectedMonth]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (date) => {
    const updatedEvents = events.filter((event) => event.date !== date);
    setEvents(updatedEvents);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleEventCreate = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h1>2023 Calendar</h1>
        <div className="header-right">
          <label>Select Month: </label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}>
            {moment.months().map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="calendar-body">
        {[...Array(12).keys()].map((monthOffset) => {
          const month = currentDate.clone().add(monthOffset, 'months');
          const isCurrentMonth = month.isSame(moment(), 'month');
          const monthClasses = isCurrentMonth ? 'month current-month' : 'month';

          return (
            <div key={month.format('MMMM')} id={month.format('MMMM')} className={monthClasses}>
              <h2>{month.format('MMMM')}</h2>
              <div className="days">
                {[...Array(month.daysInMonth()).keys()].map((day) => {
                  const date = month.clone().set('date', day + 1);
                  const isToday = date.isSame(moment(), 'day');
                  const hasEvent = events.some((event) => event.date === date.format('YYYY-MM-DD'));
                  const dayClasses = isToday ? 'day today' : 'day';
                  const eventClasses = hasEvent ? 'event' : '';
                  const sundayClass = date.day() === 0 ? 'sunday' : '';

                  return (
                    <div key={date.format('YYYY-MM-DD')} className={`${dayClasses} ${eventClasses} ${sundayClass}`}>
                      <span onClick={() => handleDateClick(date)}>{date.format('D')}</span>
                      {hasEvent && (
                        <>
                          <FaTrash className="delete-event-icon" onClick={() => handleDeleteEvent(date.format('YYYY-MM-DD'))} />
                          <div className="event-tooltip">{events.find((event) => event.date === date.format('YYYY-MM-DD')).title}</div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Creation Page */}
      {isModalOpen && (
        <EventCreationPage selectedDate={selectedDate} onCreate={handleEventCreate} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default App;
