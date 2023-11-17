import './App.css';
import Calendar from 'react-calendar'
import Event from "./components/Event";
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    console.log(value.toLocaleDateString('en-us'));
  }, [value]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>Daily Planner</h1>
      </header>

      <div className='app-body'>
        <Calendar 
          onChange={setValue}
          value={value}
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
      
      
    </div>
  );
}

export default App;
