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

  const submitHandler = event => {
    event.preventDefault();
    axios.post('http://localhost:8080/add', {date: date.toLocaleDateString('en-us'), startTime: startTime, endTime: endTime, title: title})
    .then((data) => {
      console.log(data);
      setStart('');
      setEnd('');
      setTitle('');
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
          <ul>
            <Event
            startTime={'1:00'}
            endTime={'2:00'}
            name={'Really cool party'}/>
            <Event
            startTime={'2:00'}
            endTime={'3:00'}
            name={'Kind of cool after party'}/>
          </ul>
      </div>
      <form onSubmit={submitHandler}>
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
