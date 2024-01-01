// EventCreationPage.js
import React, { useState } from 'react';

const EventCreationPage = ({ selectedDate, onCreate, onClose }) => {
  const [eventTitle, setEventTitle] = useState('');

  const handleCreateEvent = () => {
    onCreate({ date: selectedDate.format('YYYY-MM-DD'), title: eventTitle });
    onClose();
  };

  return (
    <div className="event-creation-page">
      <h2>Create Event</h2>
      <p>Date: {selectedDate.format('MMMM D, YYYY')}</p>
      <label>Title:</label>
      <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
      <div className="button-container">
        <button className="button" onClick={handleCreateEvent}>Create Event</button>
        <button className="button cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EventCreationPage;
