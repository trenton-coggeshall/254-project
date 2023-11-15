import './App.css';
import Calendar, { MonthView } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="App">
      <header className="App-header">
        <Calendar 
        onChange={setValue}
        value={value}
        />
      </header>
    </div>
  );
}

export default App;
