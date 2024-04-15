import React, { useEffect, useState } from "react";
import './App.css'

const App = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Function to format time in HH:MM:SS format
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => setTime(time => time + 10), 10);
    } 
    
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (time) {
      const rest = laps.slice(0,laps.length-1);    
      let last =  time - rest.reduce((acc,x) => acc+x, 0);
      setLaps([...rest,last]);
    } else {
      setLaps([]);
    }
  },[time]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  // Calculate total elapsed time for all laps
  const totalElapsedTime = laps.reduce((acc, lap) => acc + lap, 0);

  return (
    <div className="App">
      <h1>React Stopwatch</h1>

      <div className="display">{formatTime(time)}</div>

      <div className="buttons">
        {!isRunning && !time && <button onClick={handleStart}>Start</button>}
        {!isRunning && time > 0 && <button onClick={handleStart}>Resume</button>}
        {isRunning && <button onClick={handleStop}>Stop</button>}
        {isRunning && <button onClick={handleLap}>Lap</button>}
        {!isRunning && time > 0 && <button onClick={handleReset}>Reset</button>}
      </div>

      <div className="laps">
        <h2>Lap Times</h2>
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            <span className="lap-number">Lap {index + 1}:</span>
            <span className="lap-time">{formatTime(lap)}</span>
          </div>
        ))}
      </div>

      <div className="total-time">
        <h2>Total Elapsed Time</h2>
        <div>{formatTime(totalElapsedTime)}</div>
      </div>
    </div>
  );
};

export default App;
