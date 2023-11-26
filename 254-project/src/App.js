import axios from 'axios';
import './App.css';
import Calendar from 'react-calendar'
import Event from "./components/Event";
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [date, setDate] = useState(new Date());
  const [startTime, setStart] = useState('');
  const [endTime, setEnd] = useState('');
  const [title, setTitle] = useState('');
  const [events, setEvents] = useState([]); // Array of events on a particular date

  // When the date value is changed, call updateDate
  useEffect(() => {
    updateDate(date);
  }, [date]);

  // Submit new event data to the database
  const submitHandler = event => {
    event.preventDefault();
    axios.post('http://localhost:8080/add', {date: date.toLocaleDateString('en-us'), startTime: startTime, endTime: endTime, title: title})
    .then((data) => {
      console.log(data);
      setStart('');
      setEnd('');
      setTitle('');
      updateDate(date);
    });
  }

  // Retrieve event data for the current date from the database
  const updateDate = (newDate) => {
    axios.post('http://localhost:8080/test', {date: date.toLocaleDateString('en-us')})
    .then((data) => {
      setEvents(data.data);
    });
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>Daily Planner</h1>
      </header>

      <div className='app-body'>
        <Calendar 
          onChange={setDate}
          value={date}
          />
        <ul className='event-list'>
          <h3 className='header-text'>Events:</h3>
          {events.map((e) => (
            <Event
              startTime={e.StartTime}
              endTime={e.EndTime}
              name={e.Title}
            />
          ))}
        </ul>
      </div>
      <form onSubmit={submitHandler}>
        <h2 className='header-text'>Add a new event for {date.toLocaleDateString('en-us')}:</h2>
        <input
          placeholder='Enter Start Time'
          value={startTime}
          onChange={(event) => {
            setStart(event.target.value);
          }}
        />
        <input
          placeholder='Enter End Time'
          value={endTime}
          onChange={(event) => {
            setEnd(event.target.value);
          }}
        />
        <input
          placeholder='Enter Event Title'
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button type='submit'>
          Add Event
        </button>
      </form>
    </div>
  );
}

export default App;
